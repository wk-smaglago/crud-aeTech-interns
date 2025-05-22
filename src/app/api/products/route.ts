import { NextRequest, NextResponse } from "next/server";

// GET all products
export async function GET() {
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
    
    const newProduct = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || "",
      price: body.price,
      stock: body.stock || 0
    };
    
    products.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

