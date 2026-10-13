# Import mines and ports data (data only, no website changes)

Both documents were read page by page (mines: 10 pages, ports: 3 pages). Pages with Hindi text were checked as images, because copied text came out garbled. Nothing on the website changes in this step.

## Proposed data structure

Mines — one record per listed mine or area:
```text
id, state, operator, coalfield, area, mineName,
sourceLabel   (exact wording as printed, e.g. "(II) Dipka OCP")
sourceDocument "VISHWAKARMA COMPANY MINES 2.pdf"
sourcePage, needsReview (true/false), reviewNotes[]
```
Ports — one record per port:
```text
id, state, portName, sourceLabel, sourceDocument "COMPANY port.pdf",
sourcePage, needsReview, reviewNotes[]
```
Unknown fields stay empty ("unknown") and are flagged. Spellings are never corrected; a suggested reading may go in reviewNotes only.

## Entry counts

Mines (139 records)
| State | Entries | Groups as printed |
|---|---|---|
| West Bengal | 16 | ECL list 11, Dishergarh/Asansol belt 2, Rajmahal area 3 |
| Chhattisgarh | 20 | Korba 5, Raigarh 6, Bilaspur (Umater area) 9 |
| Madhya Pradesh | 16 | Singrauli 6, Sahagpur 3, Pench-Kanhan-Tawa 2, Other 5 |
| Telangana | 19 | one mixed list |
| Jharkhand | 19 | Jharia 10, Bokaro 3, North Karanpura 2, South Karanpura 4 |
| Odisha | 20 | Talcher 8, IB Valley 12 |
| Maharashtra | 1 | Wardha Valley only, no mine names |
| Nagaland | 4 | Tizit Belt, Naganimora, plus 2 districts/belts with no mines listed |
| Assam | 10 | Makum 6, Tikak 2, Dilli Jeypore 2 |
| Meghalaya | 14 | Jaintia 7, Khasi 4, Garo 3 |

Ports (30 records): West Bengal 2, Odisha 3, Andhra Pradesh 5, Tamil Nadu 5, Kerala 2, Karnataka 1, Goa 1, Maharashtra 5, Gujarat 6.

## Issues needing your check

Company / source
- Both documents are headed "VISHWAKARMA.WORLD PRIVATE LIMITED" (the mines document says "VISHWAKARMA.WORL"). Is it fine to show this data on the Dhanraj site, and should we credit the source?

Mines — unclear or inconsistent
- West Bengal ECL list jumps from (VII) to (IX). Item VIII is missing.
- West Bengal "Rajmahal Area (Urndda)": Rajmahal is usually in Jharkhand. "Urndda" is unclear.
- Chhattisgarh "Chhal OCP" appears under both Korba and Raigarh (possible duplicate).
- Chhattisgarh "Bilaspur (Umater area)" and "Dharm Jaigarh Belt" are unclear. "Amadan O. OC.", "Rajgmar RO" and "Baround" may be misspelled.
- MP "Jayant" appears under both Singrauli and Other Mines (possible duplicate). The Singrauli mines Nigahi, Jayant, Amlohri, Dudhichua, Khadia and Bina are listed under Madhya Pradesh, but several are usually in Uttar Pradesh. "Sahagpur coalfiled", "Disit" and "Satpura coal mains" are written as printed.
- Telangana operator is printed as "CCL + SCCL". CCL is a Jharkhand company, so this may be a mistake. "STPP Mill R&Techs" and "GDKOC-3 CHP" are plants rather than mines. Coalfield is unknown for all of them.
- Jharkhand: "Sijua" appears twice. "Bastacolla Area" and "Basta cola" may be the same place. Bokaro and Ranchi are marked "(CCCL)", which may mean CCL. "गोविंदपुर" (Govindpur) is in Hindi and may repeat "Govindpur Area". "Ram coal" may mean ROM coal.
- Odisha Talcher: six of the eight names are in Hindi (भरतपुर, अनिंता, जगन्नाथ, भुबेश्वरी, one name with broken letters "व िंंजुला", वलगराज). They are stored exactly as printed. English readings (for example Bharatpur, Ananta, Jagannath, Bhubaneswari, Lingaraj) are only suggestions.
- Maharashtra: no mine names given.
- Nagaland and Meghalaya: no operator given. Assam operator is printed as "NCL / NECL / CIL", and NCL may be a mistake.
- Assam: "Jeypore" and "Jaypore" spellings differ. Meghalaya: "Lad Rymbai" and "Rym Bai" may be the same place. A Hindi note ("सबसे बड़ा बेल्ट", meaning largest belt) is kept as a note. Other Hindi notes are kept the same way, such as Gevra's "Asia की सबसे बडी Open Cast Mines" (Asia's largest open-cast mine).
- HQ lines (e.g. "Saktoria, Pandaveswar...") are stored as operator details, not as mines.

Ports
- "Puducherry Port" and "Karaikal Port" are listed under Tamil Nadu, but both are in Puducherry.
- Spellings kept as printed and flagged: "shyama prasad mukherjee Port", "Vizhinjamm", "Jawar Lal Nehru", "Dindayal" (likely Deendayal / Kandla), "Vishakhapatnam".
- The website already mentions Navlakhi and Kandla, which are not in this list.

## Next steps after you approve
1. Create the two data files with all 169 records and the review flags.
2. Add an automatic check that the totals per state match the counts above.
3. Report again. The data stays off the website until you decide how to show it.

## Technical details
- Files: `src/data/mines.ts` and `src/data/ports.ts`, typed, with `as const` arrays plus a `countsByState` helper, following the existing `src/data` convention.
- A small vitest test asserts the counts and that every record has sourcePage and sourceLabel.
- No imports from UI components. Existing rates, products, contact and WhatsApp code stay untouched.
