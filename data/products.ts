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

// Existing catalog: images live in /products, named "rookies 05-08-26 RR <photoNumber>.png"
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

// New arrivals: images live in /New Products, named "<photoNumber>.png"
const newArrivalPhotoNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

const newArrivalNames: Record<number, string> = {
  1: "Metro Plaid",
  4: "Royal Check",
  7: "Nightfall Grid",
  10: "Urban Heritage",
  13: "Steel Plaid",
  16: "Classic Line",
  19: "Midtown Check",
  22: "Crown Grid",
};

/**
 * Single source of truth for out-of-stock sizes, keyed by product code.
 * To stock out a product: add/edit its entry here with the sizes that are unavailable.
 * To fully stock out a product (all sizes): list all four sizes, e.g. ["M", "L", "XL", "XXL"].
 * To restock a product: remove its entry (or the specific sizes) from this map.
 */
const outOfStockMap: Record<string, import("@/types").Size[]> = {
  RR02: ["M", "L", "XXL", "XL"],
  RR04: ["M", "L", "XL", "XXL"],
  RR05: ["L"],
  RR06: ["XL"],
  RR09: ["L"],
  RR11: ["M", "L", "XL", "XXL"],
  RR12: ["L", "XL", "XXL"],
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

const newArrivalProducts: Product[] = newArrivalPhotoNumbers.reduce<Product[]>(
  (acc, photoNumber, index) => {
    const groupIndex = Math.floor(index / 3);
    if (index % 3 === 0) {
      const code = `RR${String(groupIndex + 13).padStart(2, "0")}`;
      acc.push({
        id: 1000 + groupIndex + 1,
        code,
        name: newArrivalNames[photoNumber] ?? `Rookies DNMCO New Arrival ${String(groupIndex + 1).padStart(2, "0")}`,
        description: PRODUCT_DESCRIPTION,
        price: SALE_PRICE,
        images: [
          `/New Products/${String(photoNumber).padStart(2, "0")}.png`,
        ],
        outOfStockSizes: outOfStockMap[code],
        isNewArrival: true,
      });
    } else {
      const last = acc[acc.length - 1];
      last.images.push(`/New Products/${String(photoNumber).padStart(2, "0")}.png`);
    }
    return acc;
  },
  []
);

export const products: Product[] = [
  ...[...newArrivalProducts].reverse(),
  ...[...productsInCodeOrder].reverse(),
];

export function getProductByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}
