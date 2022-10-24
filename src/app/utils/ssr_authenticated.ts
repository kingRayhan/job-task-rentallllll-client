import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { httpClient } from "../api/client/httpClient";

export const ssr_authenticated = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  try {
    const _response = await httpClient.get("/user", {
      withCredentials: true,
      headers: {
        // @ts-ignore
        Cookie: context.req.headers?.cookie,
      },
    });
    return _response.data.data;
  } catch (error) {
    return null;
  }
};
