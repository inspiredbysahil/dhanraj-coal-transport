export type Rate = { category: string; gcv: string; source: string; grade: string; qty: string; rate: number; remarks: string };
const r = (category:string,gcv:string,source:string,grade:string,qty:string,rate:number,remarks:string):Rate => ({category,gcv,source,grade,qty,rate,remarks});
// Update both values by hand whenever the rate sheet changes.
export const effectiveDate = "12/07/2026";
export const effectiveDateLabel = "12 July 2026";
export const rates: Rate[] = [
  r("Domestic (Mine)","6800–7000","Dhanbad","Coking (ROM)","1,850",9200,"Gross incl. loading"), r("Domestic (Mine)","6500–6800","Dhanbad","Coking (ROM)","1,200",7700,"Gross incl. loading"),
  r("Domestic (Mine)","6200–6500","Dhanbad","Coking (ROM)","2,700",7500,"Gross incl. loading"), r("Domestic (Mine)","6200–6500","Ramgarh","Coking (ROM)","2,000",7575,"Gross incl. loading"),
  r("Domestic (Mine)","6000–6200","Dhanbad","Coking (ROM)","1,500",7100,"Gross incl. loading"), r("Domestic (Mine)","6000–6200","Ramgarh","Coking (ROM)","1,575",7325,"Gross incl. loading"),
  r("Domestic (Mine)","5700–6000","Dhanbad","Coking (ROM)","1,600",6850,"Gross incl. loading"), r("Domestic (Mine)","5700–6000","Ramgarh","Coking (ROM)","6,500",7075,"Gross incl. loading"),
  r("Imported (Navlakhi)","5760 GAR","Navlakhi Port","MV. African Bateleur (A) — MIP","—",10215,"+ GST + TCS"), r("Port (Kandla/Tuna)","High","Kandla","High Kandla","—",14125,"+ GST + TCS · freight extra"),
  r("Port (Kandla/Tuna)","High","Tuna","High Tuna","—",14175,"+ GST + TCS · freight extra"), r("Imported (Navlakhi)","5430 GAR","Navlakhi Port","MV. African Bateleur (B) — Singlurus","—",9315,"+ GST + TCS"),
  r("Imported (Navlakhi)","5420 GAR","Navlakhi Port","MV. Jahan Sister I — ABN","—",9115,"+ GST + TCS"), r("Domestic (Mine)","5400–5700","Ramgarh","Non-Coking (ROM)","7,550",6825,"Gross incl. loading"),
  r("Imported (Navlakhi)","5260 GAR","Navlakhi Port","MV. Eleftherotria — Hi GAR BSSR","—",9015,"+ GST + TCS"), r("Imported (Navlakhi)","4976 GAR","Navlakhi Port","MV. Lafkada I — Bayan","—",8015,"+ GST + TCS"),
  r("Imported (Navlakhi)","4830 GAR","Navlakhi Port","MV. New Horizon — Lanna Harita","—",7165,"+ GST + TCS"), r("Domestic (Port)","5500","Raniganj","RB2 — Domestic","15,000",6900,"Subject to availability"),
  r("Domestic (Port)","5500","Dhanbad","RB2 — Domestic (6000 GCV)","12,000",6900,"Down ₹100/ton — FOB only"), r("Domestic (Port)","5500","Mangalore","RB3 — Domestic (6000 GCV)","15,000",9300,"Down ₹300/ton"),
  r("Domestic (Mine)","5200–5500","Ramgarh","Non-Coking (ROM)","12,000",6125,"Gross incl. loading"), r("Imported (Navlakhi)","3828 GAR","Navlakhi Port","MV. Azul — Mifa","—",7065,"+ GST + TCS"),
  r("Domestic (Mine)","4900–5200","Ramgarh","Non-Coking (ROM)","4,875",5875,"Gross incl. loading"), r("Domestic (Port)","4800–5000","Vizag","RB3 — Domestic (6000 GCV)","25,000",11300,"Down ₹100/ton — FOB only"),
  r("Port (Kandla/Tuna)","Low","Kandla","Low Kandla","—",12125,"+ GST + TCS · freight extra"), r("Domestic (Mine)","4500–4800","Ramgarh","Non-Coking (ROM)","5,225",5525,"Gross incl. loading"),
  r("Domestic (Mine)","4000–4300","North Karanpura","Non-Coking (ROM)","7,850",3250,"Ex-Mine"), r("Domestic (Mine)","3800–4000","North Karanpura","Non-Coking (ROM)","7,150",3050,"Ex-Mine"),
];