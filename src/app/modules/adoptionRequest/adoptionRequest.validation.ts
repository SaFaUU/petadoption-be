import { z } from "zod";

const submitAdoptionRequest = z.object({
  body: z.object({
    petId: z.string({
      required_error: "Pet Id field is required",
    }),
    petOwnershipExperience: z.string({
      required_error: "Pet Ownership Experience field is required",
    }),
  }),
});

const updateAdoptionRequestStatus = z.object({
  body: z.object({
    status: z.string({
      required_error: "Status field is required",
    }),
  }),
});

export const AdoptionRequestValidation = {
  submitAdoptionRequest,
  updateAdoptionRequestStatus,
};
