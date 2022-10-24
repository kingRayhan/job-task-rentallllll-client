import bookingsApiRepo from "@/app/api/repositories/bookings.api-repo";
import { BOOKING_STATUS } from "@/app/models/Booking.model";
import { ssr_authenticated } from "@/app/utils/ssr_authenticated";
import { useQuery } from "@tanstack/react-query";
import { Button, Radio, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

interface BookingTableType {
  product: string;
  status: "CONSUMING" | "RETURNED";
  borrowed_at: Date;
  price: number;
  returned_at: Date;
  estimated_end_date: Date;
}
const BookingsPage: NextPage = () => {
  const [filterMode, setFilterMode] = useState<BOOKING_STATUS | null>(null);

  const { data: myBookings, isFetching } = useQuery(
    ["myBookings", filterMode],
    async () => {
      const { data } = await bookingsApiRepo.myBookings({
        limit: 100,
        page: 1,
        status: filterMode,
      });
      return data?.data?.contents;
    }
  );

  const columns: ColumnsType<BookingTableType> = [
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Borrowed at",
      dataIndex: "borrowed_at",
    },
    {
      title: "Estimated return date",
      dataIndex: "estimated_end_date",
    },
    {
      title: "Returned at",
      dataIndex: "returned_at",
      render: (returned_at) => (returned_at ? returned_at : "Not returned yet"),
    },
    {
      title: "Cost",
      dataIndex: "price",
      render: (price) => (price === 0 ? "Not calculated yet" : price),
    },
    {
      title: "Action",
      render: () => <Button type="primary">Return</Button>,
    },
  ];

  return (
    <div>
      <Head>
        <title>Rental App | My bookings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-xl font-semibold">My bookings</h1>

        <div className="my-2">
          <Radio.Group onChange={(e) => setFilterMode(e.target.value)}>
            <Radio.Button type="primary" value={null}>
              No Filter
            </Radio.Button>
            <Radio.Button type="primary" value="CONSUMING">
              Currently Using
            </Radio.Button>
            <Radio.Button type="primary" value="RETURNED">
              Returned
            </Radio.Button>
          </Radio.Group>
        </div>

        <Table
          columns={columns}
          pagination={false}
          dataSource={myBookings?.map((booking) => ({
            product: booking.product.name,
            status: booking.status,
            borrowed_at: booking.start_date,
            estimated_end_date: booking.estimated_end_date,
            price: booking.price,
            returned_at: booking.returned_at,
          }))}
          loading={isFetching}
        />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await ssr_authenticated(context);
  if (!user) return { redirect: { destination: "/login", permanent: false } };
  return { props: {} };
};

export default BookingsPage;