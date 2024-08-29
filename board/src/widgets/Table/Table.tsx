import { Table } from ".";
import { resolveDataset } from "../../hooks";

function Cell({ children }: { children: string }) {
  return (
    <td className="px-3 py-2 text-sm text-gray-600 whitespace-nowrap">
      {children}
    </td>
  );
}

function Header({ children }: { children: string }) {
  return (
    <th className="px-3 py-3 text-sm font-semibold text-left text-gray-600 ">
      {children}
    </th>
  );
}

export default function TableWidget({
  values,
  columns,
  showHeaders = false,
  title = "Top sellers",
  data,
}: Table) {
  const resolvedDataset = resolveDataset(values, data);
  const headers = Object.keys(resolvedDataset[0]);

  function filterColumns(item: string) {
    if (!columns || !Array.isArray(columns)) return item;
    else {
      return columns.includes(item);
    }
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden border rounded">
      {title && (
        <div className="px-2 py-2 text-sm text-center text-gray-600 ">
          {title}
        </div>
      )}
      <table cellSpacing={0} className="h-full min-w-full border-collapse">
        {showHeaders && (
          <thead className="">
            <tr className="border-b">
              {headers.filter(filterColumns).map((header) => (
                <Header key={header}>{header}</Header>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-gray-200">
          {resolvedDataset.map((row, i) => (
            <tr key={i} className="">
              {Object.keys(row)
                .filter(filterColumns)
                .map((key, j) => (
                  <Cell key={j}>{row[key].toString()}</Cell>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
