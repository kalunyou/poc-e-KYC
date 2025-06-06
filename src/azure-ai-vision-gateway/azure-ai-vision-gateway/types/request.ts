export type FaceDetectionRequest = {
  imageContent: string;
};

export type FaceVerificationRequest = {
  faceId1: string;
  faceId2: string;
};
