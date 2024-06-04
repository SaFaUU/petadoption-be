import { z } from "zod";

const addPet = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name field is required",
    }),
    species: z.string({
      required_error: "Species field is required",
    }),
    breed: z.string({
      required_error: "Breed field is required",
    }),
    age: z.number({
      required_error: "Age field is required",
    }),
    size: z.string({
      required_error: "Size field is required",
    }),
    location: z.string({
      required_error: "Location field is required",
    }),
    description: z.string({
      required_error: "Description field is required",
    }),
    temperament: z.string({
      required_error: "Temperament field is required",
    }),
    medicalHistory: z.string({
      required_error: "Medical History field is required",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption Requirements field is required",
    }),
  }),
});

const updatePet = z.object({
  body: z.object({
    name: z.string().optional(),
    species: z.string().optional(),
    breed: z.string().optional(),
    age: z.number().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional(),
  }),
});

export const PetValidation = {
  addPet,
  updatePet,
};
