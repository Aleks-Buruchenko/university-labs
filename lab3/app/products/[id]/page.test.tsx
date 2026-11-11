import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, redirectMock, getProductByIdMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  redirectMock: vi.fn((path: string) => {
    throw new Error(`REDIRECT:${path}`);
  }),
  getProductByIdMock: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: authMock }));
vi.mock("@/lib/dummyjson", () => ({ getProductById: getProductByIdMock }));
vi.mock("next/navigation", () => ({ redirect: redirectMock }));

import ProductPage from "@/app/products/[id]/page";

describe("Product detail page access control", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMock.mockResolvedValue(null);
  });

  it("redirects an anonymous visitor before requesting the product", async () => {
    await expect(
      ProductPage({ params: Promise.resolve({ id: "1" }) })
    ).rejects.toThrow("REDIRECT:/login");

    expect(redirectMock).toHaveBeenCalledWith("/login");
    expect(getProductByIdMock).not.toHaveBeenCalled();
  });
});
