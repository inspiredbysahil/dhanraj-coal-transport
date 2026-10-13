import { auth, defineMcp } from "@lovable.dev/mcp-js";
import companyInfo from "./tools/company-info";
import listProducts from "./tools/list-products";
import getRates from "./tools/get-rates";
import searchMines from "./tools/search-mines";
import listPorts from "./tools/list-ports";
import getFaq from "./tools/get-faq";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "remix-of-coal-visual-connect",
  title: "Remix of Coal Visual Connect",
  version: "0.1.0",
  instructions: "Read Dhanraj Coal Transport's products, indicative rates (INR/ton), coal mines directory, ports, FAQs and contact details.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [companyInfo, listProducts, getRates, searchMines, listPorts, getFaq],
});
