export type HeatInputs = { coalMT: string; coalGCV: string; petCokeGCV: string; coalPrice: string; petCokePrice: string };
export const heatDefaults: HeatInputs = { coalMT: "500", coalGCV: "5500", petCokeGCV: "8200", coalPrice: "", petCokePrice: "" };
export const heatFields = [
  { key: "coalMT", label: "Monthly coal consumption (MT)", placeholder: "500" },
  { key: "coalGCV", label: "Coal GCV (kcal/kg)", placeholder: "5500" },
  { key: "petCokeGCV", label: "Pet Coke GCV (kcal/kg)", placeholder: "8200" },
  { key: "coalPrice", label: "Coal price (₹/Ton)", placeholder: "Enter comparison price" },
  { key: "petCokePrice", label: "Pet Coke price (₹/Ton)", placeholder: "Enter comparison price" },
] as const;
export type HeatResult = { errors: Partial<Record<keyof HeatInputs, string>>; equivalentMT: number | null; coalCost: number | null; petCokeCost: number | null; difference: number | null };
export function calculateHeat(inputs: HeatInputs): HeatResult {
  const errors: HeatResult["errors"] = {};
  for (const field of heatFields) {
    const raw = inputs[field.key].trim();
    const optional = field.key === "coalPrice" || field.key === "petCokePrice";
    if (!raw && optional) continue;
    if (!raw || !Number.isFinite(Number(raw)) || Number(raw) <= 0) errors[field.key] = "Enter a number greater than zero.";
  }
  let equivalentMT: number | null = null;
  if (!errors.coalMT && !errors.coalGCV && !errors.petCokeGCV) {
    const value = Number(inputs.coalMT) * Number(inputs.coalGCV) / Number(inputs.petCokeGCV);
    if (Number.isFinite(value) && value > 0) equivalentMT = value;
    else errors.coalMT = "These values are too large to compare.";
  }
  const priced = equivalentMT !== null && !Object.keys(errors).length && inputs.coalPrice.trim() !== "" && inputs.petCokePrice.trim() !== "";
  const coalCost = priced ? Number(inputs.coalMT) * Number(inputs.coalPrice) : null;
  const petCokeCost = priced && equivalentMT !== null ? equivalentMT * Number(inputs.petCokePrice) : null;
  if ((coalCost !== null && !Number.isFinite(coalCost)) || (petCokeCost !== null && !Number.isFinite(petCokeCost))) {
    errors.coalPrice = "These prices are too large to compare.";
    return { errors, equivalentMT, coalCost: null, petCokeCost: null, difference: null };
  }
  return { errors, equivalentMT, coalCost, petCokeCost, difference: coalCost !== null && petCokeCost !== null ? coalCost - petCokeCost : null };
}
export const formatHeatQuantity = (value: number) => value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export function heatQuoteMessage(inputs: HeatInputs) {
  const result = calculateHeat(inputs);
  if (result.equivalentMT === null || Object.keys(result.errors).length) return null;
  return `Hello DHANRAJ COAL TRANSPORT, please share today’s Pet Coke rate and delivery terms.\nMonthly coal consumption: ${inputs.coalMT} MT\nCoal GCV: ${inputs.coalGCV} kcal/kg\nPet Coke GCV reference: ${inputs.petCokeGCV} kcal/kg\nEquivalent Pet Coke quantity: ${formatHeatQuantity(result.equivalentMT)} MT (equal gross heat, equal efficiency assumption)${inputs.coalPrice.trim() ? `\nBuyer-entered coal comparison price: ₹${inputs.coalPrice}/ton` : ""}${inputs.petCokePrice.trim() ? `\nBuyer-entered Pet Coke comparison price: ₹${inputs.petCokePrice}/ton` : ""}\nPlease confirm actual lot specifications, availability, current price, GST, applicable TCS and freight.\nOrder quantity (minimum 100 MT):\nDelivery city / state:`;
}