export type FaceDetectionResponse = {
  faceId: string;
  recognitionModel: string;
  faceRectangle: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  faceLandmarks: {
    [key: string]: {
      x: number;
      y: number;
    };
  };
  faceAttributes: {
    glasses: string;
    headPose: {
      roll: number;
      yaw: number;
      pitch: number;
    };
    occlusion: {
      foreheadOccluded: boolean;
      eyeOccluded: boolean;
      mouthOccluded: boolean;
    };
    accessories: {
      type: string;
      confidence: number;
    }[];
    blur: {
      blurLevel: string;
      value: number;
    };
    exposure: {
      exposureLevel: string;
      value: number;
    };
    noise: {
      noiseLevel: string;
      value: number;
    };
    qualityForRecognition: string;
  };
};

export type FaceVerificationResponse = {
  isIdentical: boolean;
  confidence: number;
};
