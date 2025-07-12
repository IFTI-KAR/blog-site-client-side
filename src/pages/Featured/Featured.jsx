import React, { useEffect, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSortAlphaDown, FaSortAlphaUpAlt, FaSort } from 'react-icons/fa';

const Featured = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('https://blog-server-five-alpha.vercel.app/blogs/featured');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching featured blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Mouse movement background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setBgPos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const columnHelper = createColumnHelper();
  const columns = useMemo(() => [
    columnHelper.accessor((row, index) => index + 1, {
      id: 'index',
      header: '#',
      cell: info => <span className="font-semibold text-blue-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: info => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => (
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Author',
      cell: info => <span className="text-gray-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor(row => row.longDesc?.split(/\s+/).length || 0, {
      id: 'wordCount',
      header: 'Word Count',
      cell: info => <span className="text-purple-700 font-semibold">{info.getValue()}</span>,
      sortingFn: 'basic',
    }),
  ], []);

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getSortIcon = (column) => {
    if (!column.getCanSort()) return null;
    return column.getIsSorted() === 'asc'
      ? <FaSortAlphaDown className="inline ml-1" />
      : column.getIsSorted() === 'desc'
      ? <FaSortAlphaUpAlt className="inline ml-1" />
      : <FaSort className="inline ml-1 text-gray-400" />;
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${bgPos.x}% ${bgPos.y}%, #c1dfff, #e0f0ff, #ffffff)`,
        transition: 'background-position 0.3s ease',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 drop-shadow-md">
          🌟 Top 10 Featured Blogs
        </h1>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading featured blogs...</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto rounded-xl shadow-xl backdrop-blur-lg bg-white/80"
          >
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead className="bg-blue-100 text-blue-900 uppercase text-sm font-bold tracking-wide">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-6 py-4 text-left cursor-pointer select-none hover:text-blue-900 transition"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {getSortIcon(header.column)}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                <AnimatePresence>
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: rowIndex * 0.03 }}
                      className="hover:bg-blue-50 border-t transition"
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 text-gray-800">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Featured;
