function ProductCard(props) {
  const product = props.product;
  const onClick = props.onClick;

  return (
    <div
      onClick={function () {
        onClick(product);
      }}
      className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
      <p className="text-gray-600 font-medium">${product.price}</p>
    </div>
  );
}

export default ProductCard;
