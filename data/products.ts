import { Product } from "@/types";
import { SALE_PRICE } from "@/lib/pricing";

const PRODUCT_DESCRIPTION = `### Shirt Details
- Export Quality Premium Shirt
- 100% Cotton Fabric
- Fabric Weight: 210-230 GSM
- Soft & Comfortable
- Durable Stitching

### Features
- Premium Quality
- Perfect fit for everyday wear

### Wash Care
- Machine or hand wash with cold/normal water.
- Use mild detergent.
- Do not bleach.
- Avoid direct sunlight while drying.

### Delivery Information
- Inside Dhaka: 1–2 working days
- Outside Dhaka: 2–3 working days
*Note: Delivery may occasionally be delayed due to unforeseen circumstances or courier-related issues.*`;

const productPhotoNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

const productNames: Record<number, string> = {
  1: "Urban Check",
  4: "Midnight Plaid",
  7: "Classic Grid",
  10: "Shadow Check",
  13: "Royal Plaid",
  16: "Streetline Check",
  19: "Vintage Grid",
  22: "Bold Check",
  25: "Urban Plaid",
  31: "Heritage Check",
  34: "Monarch Grid",
  37: "Rugged Check",
};

const outOfStockMap: Record<string, import("@/types").Size[]> = {
  RR04: ["M", "L", "XL", "XXL"], RR02: ["M", "L" , "XXL" , "XL"], RR05: ["L"], RR12: ["L", "XXL"]
};

const productsInCodeOrder: Product[] = productPhotoNumbers.reduce<Product[]>(
  (acc, photoNumber, index) => {
    const groupIndex = Math.floor(index / 3);
    if (index % 3 === 0) {
      const code = `RR${String(groupIndex + 1).padStart(2, "0")}`;
      acc.push({
        id: groupIndex + 1,
        code,
        name: productNames[photoNumber] ?? `Rookies DNMCO Premium Shirt ${String(photoNumber).padStart(2, "0")}`,
        description: PRODUCT_DESCRIPTION,
        price: SALE_PRICE,
        images: [
          `/products/rookies 05-08-26 RR ${String(photoNumber).padStart(2, "0")}.png`,
        ],
        outOfStockSizes: outOfStockMap[code],
      });
    } else {
      const last = acc[acc.length - 1];
      last.images.push(
        `/products/rookies 05-08-26 RR ${String(photoNumber).padStart(2, "0")}.png`
      );
    }
    return acc;
  },
  []
);

export const products: Product[] = [...productsInCodeOrder].reverse();

export function getProductByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}
