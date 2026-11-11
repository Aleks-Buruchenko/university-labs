import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { authMock, getProductsMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  getProductsMock: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: authMock }));
vi.mock("@/lib/dummyjson", () => ({ getProducts: getProductsMock }));

import { GET } from "@/app/api/products/route";

describe("GET /api/products access control", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMock.mockResolvedValue(null);
  });

  it("returns 401 and does not fetch data for an anonymous visitor", async () => {
    const request = new NextRequest("http://localhost:3000/api/products");
    const response = await GET(request);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      message: "Для просмотра каталога войдите в систему.",
    });
    expect(getProductsMock).not.toHaveBeenCalled();
  });

  it("returns products for an authenticated user", async () => {
    authMock.mockResolvedValue({
      user: { id: "user-1", role: "user" },
    });
    getProductsMock.mockResolvedValue({
      products: [],
      total: 0,
      skip: 0,
      limit: 12,
    });

    const request = new NextRequest(
      "http://localhost:3000/api/products?limit=12&skip=0"
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      products: [],
      total: 0,
      skip: 0,
      limit: 12,
    });
    expect(getProductsMock).toHaveBeenCalledOnce();
  });
});
