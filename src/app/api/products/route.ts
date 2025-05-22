import { NextRequest, NextResponse } from "next/server";
import { addProduct, getProducts } from "@/lib/mockDatabase";

// GET all products
export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required fields" },
        { status: 400 }
      );
    }
    
    const newProduct = addProduct({
      name: body.name,
      description: body.description || "",
      price: body.price,
      stock: body.stock || 0
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}