import { deleteProduct, getProductById, updateProduct } from "@/lib/mockDatabase";
import { NextRequest, NextResponse } from "next/server";

// GET a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = getProductById(params.id);
  
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
    const updatedProduct = updateProduct(params.id, body);
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProduct);
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
    const updatedProduct = updateProduct(params.id, body);
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProduct);
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
  const deletedProduct = deleteProduct(params.id);
  
  if (!deletedProduct) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(
    { message: "Product deleted successfully", deletedProduct },
    { status: 200 }
  );
}