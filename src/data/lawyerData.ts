export type { Lawyer } from "./lawyerTypes";

import type { Lawyer } from "./lawyerTypes";
import { drCarlosMoro } from "./lawyers/dr-carlos-moro";
import { drEmilioFMoro } from "./lawyers/dr-emilio-f-moro";
import { draEmiliaVaca } from "./lawyers/dra-emilia-vaca";

export const lawyerDetails: Record<string, Lawyer> = {
  "dr-carlos-moro": drCarlosMoro,
  "dr-emilio-f-moro": drEmilioFMoro,
  "dra-emilia-vaca": draEmiliaVaca,
};
