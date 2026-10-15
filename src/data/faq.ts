import { effectiveDateLabel } from "@/data/rates";
import { quoteCopy } from "@/data/quote-request";

export const faqTitle = "Frequently Asked Questions (B2B Buyer FAQ)";

export const faq = [
  ["What is the Minimum Order Quantity (MOQ) for coal and pet coke dispatch?", "The minimum order quantity is 100 Metric Tons (MT) for coal and Pet Coke. Share your grade, quantity and delivery location so we can confirm lot availability and road or rail dispatch terms."],
  ["Which ports and coal mines do you lift from?", "We handle coal supply enquiries for Dhanbad (BCCL/Jharia), Ramgarh (CCL), Raniganj (ECL) and imported coal through Navlakhi, Kandla and Tuna. Pet Coke enquiries cover Kandla, Tuna, Navlakhi and domestic refineries. Availability and lifting arrangements are confirmed per order. The mines and Indian Ports directories preserve source-listed records; a directory listing does not imply active Dhanraj supply or current stock."],
  ["Are the listed ₹/ton rates inclusive of GST, TCS, and freight?", `No. The coal rate sheet dated ${effectiveDateLabel} shows indicative ex-mine or ex-yard rates per ton, not a confirmed quotation. GST at 18% is extra; TCS applies as applicable, freight depends on your delivery location, and loading follows each row’s remarks. Reference quantities are not live inventory. Pet Coke prices and stock are confirmed on enquiry. Request a written landed-price quotation for the final charges.`],
  ["How do you verify GCV, Ash %, and moisture before dispatch?", "Our confirmed quality process includes siding crushing and stone sorting, with pre-dispatch GCV and moisture verification against agreed requirements. Ask for the lot’s lab report to confirm ash and other specifications. Typical buying ranges are references, not a guarantee for every lot; final specifications must match the agreed lot report."],
  ["How fast can I get a landed-price quote to my factory pin code?", `Our quotation desk responds within 15 minutes during business hours (${quoteCopy.phoneBadge}). Share your coal or Pet Coke grade, quantity (minimum 100 MT), factory city, state and pin code, and preferred road or rail delivery. We will confirm the source rate, applicable charges and freight for a written landed-price quotation. Call or WhatsApp +91 63761 39600.`],
] as const;
