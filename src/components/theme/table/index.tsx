import type { TableProps } from 'antd';
import { Empty, Table } from 'antd';
import React from 'react';

import { DEFAULT_TABLE_LIMIT } from '@/utils/constants';

export interface TableComponentProps extends TableProps<any> {
  onTableChange?: (d: any) => void;
  className?: string;
  showHeader?: boolean;
  rowKey?: any;
}

const TableComponent = (props: TableComponentProps) => {
  const {
    rowKey = '',
    columns = [],
    dataSource = [],
    pagination = {},
    loading,
    onTableChange,
    className,
    showHeader = true,
  } = props;

  const onChange = (changePagination: any, changeSorter: any | any[]) => {
    if (typeof onTableChange === 'function') {
      let lkPagination = {};
      const lkFilters = {};
      let lkSorter = {};
      if (
        changePagination &&
        changePagination?.current &&
        changePagination?.defaultPageSize
      ) {
        // FIND LIMIT
        const limit = changePagination?.defaultPageSize || DEFAULT_TABLE_LIMIT;

        lkPagination = {
          skip: changePagination?.current * limit - limit,
        };
      }
      if (changeSorter?.field && changeSorter?.order) {
        lkSorter = {
          orderBy: `${changeSorter?.field}|${
            changeSorter?.order === 'ascend' ? 'asc' : 'desc'
          }`,
        };
      }
      onTableChange({
        pagination: lkPagination,
        filters: lkFilters,
        sorter: lkSorter,
      });
    }
  };

  // const rowClassName = () => 'my-table-row'; // Custom CSS class for rows
  const rowClassName = (record: { status: number }) => {
    // Conditionally assign classes based on record properties
    if (record.status === 2) {
      return 'Upcomin-row my-table-row';
    }
    if (record.status === 3) {
      return 'Ongoing-row my-table-row';
    }
    return 'my-table-row'; // Return empty string for default styling
  };
  return (
    <Table
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      className={`lkTable ${className}`}
      loading={loading}
      pagination={pagination}
      showHeader={showHeader}
      rowClassName={rowClassName}
      locale={{ emptyText: <Empty className="text-grey-500" /> }}
    />
  );
};

export default TableComponent;
