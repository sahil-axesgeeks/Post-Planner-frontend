// POST CREATION PAYLOAD
export const buildCreateSchedulePayload = ({
  postContent,
  pageId,
  scheduledAt,
}) => ({
  caption: postContent,
  page_id: pageId,
  scheduledAt,
});

// POST EDIT CREATION PAYLOAD
export const buildEditSchedulePayload = ({
  data,
  scheduledAt,
  postType,
  postContent,
}) => ({
  postTemplateId: data?.postTemplateId,
  connectedAccountPageId: data?.connectedAccountPageId,
  scheduledAt,
  postType,
  caption: postContent,
});
