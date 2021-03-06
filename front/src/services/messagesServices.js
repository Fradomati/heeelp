import { serviceApi } from "../lib/commonFunctional";

export const sendMessage = async ({
  message,
  aidRequestId,
  receptorUserId,
}) => {
  const res = await serviceApi.post("/messages/create", {
    message,
    aidRequestId,
    receptorUserId,
  });
  return res.data;
};

export const getSendMessages = async () => {
  const res = await serviceApi.post("/messages/alls-creator-id");
  return res.data;
};

export const getReceivedMessages = async () => {
  const res = await serviceApi.post("/messages/alls-receptor-id");
  return res.data;
};

export const changeToViewsMessages = async () => {
  const res = await serviceApi.post("/messages/change-status");
  return res.data;
};

export const deleteMessages = async ({ _id }) => {
  const res = await serviceApi.post("/messages/delete", { _id });
  return res.data;
};
