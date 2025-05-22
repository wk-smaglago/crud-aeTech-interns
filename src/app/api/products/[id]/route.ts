import { NextRequest, NextResponse } from "next/server";

// GET a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(product);
}

// PUT - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = products.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Update product with new data
    products[index] = {
      ...products[index],
      ...body,
      id: params.id
    };
    
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// PATCH - Partially update a product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = products.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Update only the provided fields
    products[index] = {
      ...products[index],
      ...body
    };
    
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = products.findIndex(p => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  
  // Remove the product from the array
  const deletedProduct = products[index];
  products = products.filter(p => p.id !== params.id);
  
  return NextResponse.json(
    { message: "Product deleted successfully", deletedProduct },
    { status: 200 }
  );
}