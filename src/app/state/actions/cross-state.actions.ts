/**
 * Cross State Actions
 * 
 * This file defines the actions that span all state slices.
 */
import { createAction } from "@ngrx/store";

// Action to reset the state of the application
export const resetState = createAction('[App] Reset State');
