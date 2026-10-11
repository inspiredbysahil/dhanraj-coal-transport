export type Product = {
  id: string; name: string; shortName: string; status: string; gcv: string; ash: string;
  moisture: string; sulphur: string; detailLabel: string; detail: string; availability: string;
  material: "matte" | "glossy" | "porous" | "fibrous";
};

export const products: Product[] = [
  { id: "domestic", shortName: "Domestic", name: "Domestic Coal", status: "In Stock", gcv: "3,800–7,000", ash: "18–32%", moisture: "6–12%", sulphur: "< 0.6%", detailLabel: "Sources", detail: "Dhanbad · Jharia · Raniganj · Talcher", availability: "40,000+ MT / month", material: "matte" },
  { id: "imported", shortName: "Imported", name: "Imported Indonesian Coal", status: "Vessel Ready", gcv: "4,200–6,300", ash: "4–10%", moisture: "12–24%", sulphur: "< 1.0%", detailLabel: "Ports", detail: "Navlakhi · Kandla · Tuna", availability: "25,000+ MT / vessel", material: "glossy" },
  { id: "pet-coke", shortName: "Pet Coke", name: "Pet Coke", status: "Bulk Supply", gcv: "7,800–8,500", ash: "< 1%", moisture: "< 4%", sulphur: "3–7%", detailLabel: "Use", detail: "Cement · Boilers · Kilns", availability: "Bulk on order", material: "porous" },
  { id: "wood-coal", shortName: "Wood Coal", name: "Wood Coal", status: "In Stock", gcv: "6,500–7,200", ash: "2–5%", moisture: "< 8%", sulphur: "< 0.1%", detailLabel: "Use", detail: "Brick Kilns · Bakeries", availability: "Bulk on order", material: "fibrous" },
];
