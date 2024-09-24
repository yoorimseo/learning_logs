import { useRef, useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    // 현재 진행 중인 타이머가 있다면 비우고, 새 타이머를 시작
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null; // 타이머가 만료되면 타이머 id를 수동으로 삭제하여, 저장된 타이머 식별자 비우기
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className='searchable-list'>
      <input type='search' placeholder='Search' onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
