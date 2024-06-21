const Item = ({title, quantity}) => {
    
    return (
        <>
            <div className="item flex flex-wrap p-2 align-items-center gap-3">
                {/* <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} /> */}
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <h3 className="font-bold">{title}</h3>
                    {/* <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div> */}
                </div>
                <span className="quantity font-bold text-900">{quantity}</span>
            </div>
        
        </>
    )
}

export default Item;