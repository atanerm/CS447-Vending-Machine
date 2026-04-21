// Determines product status from quantity
export function getProductStatus(quantity, capacity) {
  if (quantity === 0) return "Out";
  if (quantity <= capacity * 0.3) return "Low";
  return "Good";
}

// Determines overall machine status from its products
export function getMachineStatus(machine) {
  let hasLow = false;

  for (const product of machine.products) {
    const status = getProductStatus(product.quantity, product.capacity);

    if (status === "Out") return "Out";
    if (status === "Low") hasLow = true;
  }

  return hasLow ? "Low" : "Good";
}