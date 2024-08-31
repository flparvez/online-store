import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type SalesProps = {
  key: number,
  category: string;
  name: string;
  price: string;
  img: string;
};


export function ProductList(props: SalesProps) {

  const product =props?.data;

  return (

    <div>

    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="sm:w-[200px]">Category Name</TableHead>
         
          <TableHead>Product Name</TableHead>
          <TableHead className="sm:w-[100px]">Edit</TableHead>
          <TableHead className="sm:w-[100px]">Delete</TableHead>
          <TableHead className="text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      {product?.map((item, i) => (
          
      
  
      <TableBody key={i}>
    
      
          <TableRow >
            <TableCell className="">{item.category}</TableCell>
            <TableCell className="">{item.name}</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell className="w-4">Delete</TableCell>
            <TableCell className="text-end">{item.price}</TableCell>
          </TableRow>
        
   
      </TableBody>
    ))}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}
