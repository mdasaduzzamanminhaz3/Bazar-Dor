import React from 'react';
interface Iproduct {
id: string,
slug: string,
nameBn: string,
icon: string
}
const ProductDetails = ({product}:{product:Iproduct}) => {
    console.log(product);
    return (
        <div>
            product details
        </div>
    );
};

export default ProductDetails;