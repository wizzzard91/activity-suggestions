import React from 'react';

interface ContentCardManagerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const ContentCardManager = <T, >({items, renderItem}: ContentCardManagerProps<T>) => (
  <div>
    {items.map((item, index) => (
      <div key={index}>
        {renderItem(item, index)}
      </div>
    ))}
  </div>
)