import express from "express";
import { UserController } from "../modules/user/user.controller";
import validateRequest from "../middleware/validateRequest";
import { UserValidation } from "../modules/user/user.validation";
import { PetController } from "../modules/pet/pet.controller";
import { PetValidation } from "../modules/pet/pet.validation";
import { AdoptionRequestController } from "../modules/adoptionRequest/adoptionRequest.controller";
import { AdoptionRequestValidation } from "../modules/adoptionRequest/adoptionRequest.validation";
import auth from "../middleware/auth";
import { roles } from "../constants/common";

const router = express.Router();

// User Signup and Login
router.post(
  "/register",
  validateRequest(UserValidation.registerUser),
  UserController.registerIntoDB
);
router.post(
  "/login",
  validateRequest(UserValidation.loginUser),
  UserController.loginUser
);

router.get("/users", auth(roles.ADMIN), UserController.getAllUsers);

router.put("/change-role", auth(roles.ADMIN), UserController.changeRole);
router.put("/change-status", auth(roles.ADMIN), UserController.changeStatus);

// Change Password
router.put(
  "/change-password",
  validateRequest(UserValidation.changePassword),
  UserController.changePassword
);

// Add and Update Pets
router.post(
  "/pets",
  validateRequest(PetValidation.addPet),
  PetController.createPet
);
router.put(
  "/pets/:petId",
  validateRequest(PetValidation.updatePet),
  PetController.updatePet
);
router.get("/pets", PetController.getAllPets);

// Profile API
router.get("/profile", UserController.getProfile);
router.put(
  "/profile",
  validateRequest(UserValidation.updateUser),
  UserController.updateProfile
);

// Post Adoption Request
router.post(
  "/adoption-request",
  validateRequest(AdoptionRequestValidation.submitAdoptionRequest),
  AdoptionRequestController.submitAdoptionRequest
);
router.put(
  "/adoption-requests/:requestId",
  validateRequest(AdoptionRequestValidation.updateAdoptionRequestStatus),
  AdoptionRequestController.updateAdoptionRequest
);
router.get("/adoption-requests", AdoptionRequestController.getAdoptionRequests);

export const AllRoutes = router;
