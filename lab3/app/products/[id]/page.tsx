import { redirect } from "next/navigation";
import { ProductDetails } from "@/app/components/ProductDetails";
import { auth } from "@/lib/auth";
import { getProductById } from "@/lib/dummyjson";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const productId = Number(id);
  const product =
    Number.isInteger(productId) && productId > 0
      ? await getProductById(productId)
      : null;

  return <ProductDetails productId={productId} initialProduct={product} />;
}
