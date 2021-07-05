import Image from 'next/image'
import uniqueId from "../utils/uniqueId"


const Table = ({data=[], image=false, fildImage='', editFun, deleteFun}) => {

    const TableHeader = (productslist) => {
        let colum_names = Object.keys(productslist[0]);
            colum_names.push("actions");
        return (
            <thead key={uniqueId()}>
                <tr key={uniqueId()}>
                    {colum_names.map (colum_name => <th scope="col" key={uniqueId()} >{colum_name} </th>) }
                </tr>
            </thead>
        );
    }

    const getTableBody = (data, image=false, fildImage="",  editFun, deleteFun) => {
        let colum = Object.keys(data[0]);
            colum.push("actions");
        return( 
            <tbody>
                {data.map((row,id) =>{
                  return  <tr key={uniqueId()}>
                        {colum.map(col => {
                             if(image && col==fildImage)
                                return  <td key={uniqueId()}> <Image key={uniqueId()} loader={() => row[fildImage]} src={row[fildImage]} width={40} height={40}/></td>
                             if (col=="actions"){
                                    return  (<td key={uniqueId()}>
                                            <i key={uniqueId()} className="bx bx-trash"    onClick={()=>deleteFun(row['_id'])}></i> 
                                            <i key={uniqueId()} className="bx bx-edit-alt" onClick={()=>editFun(row['_id'])}></i> 
                                            </td>)
                                }
                             return <td key={uniqueId()}>{row[col]}</td>
                        })
                       }
                    </tr>
                })}
            </tbody>
        );
    }    
    const actionEdit = (id) => id;
    const actionDelete = (id) => id;

    return data.length > 0 ? 
            <table className="table table-striped">
                {TableHeader(data)}
                {getTableBody(data, image, fildImage, editFun, deleteFun)}
            </table>
        : <div className="alert alert-primary" role="alert"> No data Found! </div>
}

export default Table;