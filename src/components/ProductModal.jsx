function ProductModal(props) {
  const product = props.product;
  const onClose = props.onClose;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
        >
          ✕
        </button>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {product.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <p className="text-xl font-bold text-violet-600">${product.price}</p>
          <p className="text-sm font-medium text-gray-700">
            ⭐ {product.rating} / 5
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
