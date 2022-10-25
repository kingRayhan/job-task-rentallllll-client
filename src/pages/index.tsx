import bookingsApiRepo from "@/app/api/repositories/bookings.api-repo";
import productsApiRepo from "@/app/api/repositories/products.api-repo";
import { Product } from "@/app/models/Product.model";
import { ssr_authenticated } from "@/app/utils/ssr_authenticated";
import { AppContext } from "@/contexts/AppGlobalContextProvider";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Input, Modal, Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import { AxiosError } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const { RangePicker } = DatePicker;

interface ProductTableType {
  key: React.Key;
  name: string;
  code: string;
  availability: boolean;
  needing_repair: boolean;
  durability: number;
  mileage: number | null;
  price: number;
  minimum_rent_period: number;
}

interface Props {
  initialProducts: Product[];
}

const Home: NextPage<Props> = ({ initialProducts }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSorter] = useState<string | null>(null);

  const [bookingConfirmationModalVisible, setBookingConfirmationModalVisible] =
    useState<boolean>(false);

  const [intendedBookingProduct, setTntendedBookingProduct] =
    useState<ProductTableType | null>(null);

  const [intendedBookingDays, setIntendedBookingDays] = useState<number>();
  const [intendedBookingDateRange, setIntendedBookingDateRange] =
    useState<any[]>();

  const { data: products, isFetching } = useQuery(
    ["products", searchQuery, sortBy],
    async () => {
      const data = await productsApiRepo.getProducts({
        page: 1,
        limit: 10,
        search: searchQuery,
        // @ts-ignore
        sortBy: sortBy,
      });
      return data.data?.data.contents;
    },
    { initialData: initialProducts }
  );

  const { mutate: mutate__bookConfirm } = useMutation(
    bookingsApiRepo.bookProduct,
    {
      onSuccess: () => {
        toast.success("Booking successful");
        cancelAllModal();
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 403) {
          // @ts-ignore
          toast.error(error.response?.data?.message);
        }
      },
    }
  );

  const columns: ColumnsType<ProductTableType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      render: (availability) => (availability ? "True" : "False"),
      sorter: true,
    },
    {
      title: "Needing Repair",
      dataIndex: "needing_repair",
      sorter: true,
      render: (needing_repair) => (needing_repair ? "True" : "False"),
    },
    {
      title: "Durability",
      dataIndex: "durability",
      sorter: true,
    },
    {
      title: "Mileage",
      dataIndex: "mileage",
      sorter: true,
      render: (mileage) => (mileage ? mileage : "N/A"),
    },
    {
      title: "Minimum Rent Period",
      dataIndex: "minimum_rent_period",
      sorter: true,
    },
    {
      title: "Price Per Day",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Action",
      render: (row) => (
        <Button type="primary" onClick={() => setTntendedBookingProduct(row)}>
          Book
        </Button>
      ),
    },
  ];

  const onChange: TableProps<ProductTableType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    if (sorter) {
      setSorter(
        // @ts-ignore
        sorter.order === "ascend" ? `${sorter.field}` : `-${sorter.field}`
      );
    }
  };

  const { currentUserId } = useContext(AppContext);

  useEffect(() => {
    if (!currentUserId) router.push("/login");
  }, [currentUserId]);

  const handleGotoBookingConfirmation = () => {
    let days = intendedBookingDays || 0;
    if (days < intendedBookingProduct?.minimum_rent_period!) {
      toast.error(
        "Minimum rent period is " +
          intendedBookingProduct?.minimum_rent_period! +
          " days"
      );
    } else {
      setBookingConfirmationModalVisible(true);
    }
  };

  const cancelAllModal = () => {
    setTntendedBookingProduct(null);
    setIntendedBookingDays(0);
    setBookingConfirmationModalVisible(false);
  };

  const handleConfirmRent = () => {
    mutate__bookConfirm({
      product: intendedBookingProduct.key.toString(),
      start_date: new Date(intendedBookingDateRange[0]),
      estimated_end_date: new Date(intendedBookingDateRange[1]),
    });
  };

  return (
    <div>
      <Head>
        <title>Rental App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="mb-2">
          <Input
            size="large"
            placeholder="Search by product name"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Table
          columns={columns}
          pagination={false}
          dataSource={products?.map((product) => ({
            key: product._id,
            minimum_rent_period: product.minimum_rent_period,
            name: product.name,
            code: product.code,
            availability: product.availability,
            needing_repair: product.needing_repair,
            durability: product.durability,
            mileage: product.mileage,
            price: product.price,
          }))}
          onChange={onChange}
          loading={isFetching}
        />
      </main>

      <Modal
        title="Book Product"
        open={intendedBookingProduct !== null}
        onOk={handleGotoBookingConfirmation}
        onCancel={() => {
          setTntendedBookingProduct(null);
        }}
      >
        <h1 className="text-2xl font-semibold">
          {intendedBookingProduct?.name}
        </h1>
        <p>Minimum Rent days: {intendedBookingProduct?.minimum_rent_period}</p>
        <RangePicker
          onChange={(dates) => {
            if (dates) {
              const days = dates![1]?.diff(dates![0], "days");
              setIntendedBookingDays(days);
              setIntendedBookingDateRange(dates);
            }
          }}
        />
      </Modal>
      <Modal
        title="Confirm Booking"
        open={bookingConfirmationModalVisible}
        onOk={handleConfirmRent}
        onCancel={cancelAllModal}
      >
        <h1 className="text-2xl font-semibold">
          You estimated price is $
          {intendedBookingDays! * intendedBookingProduct?.price!}
        </h1>
        <h1>Do you want to procedure?</h1>
      </Modal>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await productsApiRepo.getProducts({ limit: 10, page: 1 });
  return {
    props: {
      initialProducts: res.data?.data?.contents,
    },
  };
};
