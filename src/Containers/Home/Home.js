import React, { useEffect, useState } from 'react';

import ObjectiveTree from '../../Components/ObjectiveTree';
import Dropdown from '../../Components/Dropdown';
import Loader from '../../Components/Loader';
import { listToTree } from '../../Utils/convertor';
import { getCategoryOptions, filterCategories } from './convertor';

export default function Home() {
  const [objectives, setObjectives] = useState([]);
  const [filteredObjectives, setFilteredObjectives] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setOpen] = useState(true);
  const onChangeCategory = (category) => {
    const filteredCategories = filterCategories(objectives, category);
    setFilteredObjectives(filteredCategories);
    setOpen(true);
  };

  const fetchObjectives = async () => {
    setLoading(true);
    await fetch('https://okrcentral.github.io/sample-okrs/db.json')
      .then((response) => response.json())
      .then((data) => {
        const groupedList = listToTree(data.data || []);
        const categories = getCategoryOptions(groupedList);
        setObjectives(groupedList);
        setCategoryOptions(categories);
        setLoading(false);
        setError(false);
        setFilteredObjectives(groupedList);
      })
      .catch(() => {
        setError('Error Fetching data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

  return (
    <>
      <Dropdown
        placeholder="Select Category"
        options={categoryOptions}
        onChange={onChangeCategory}
      />
      {loading || error ? (
        <Loader loadingText="Loading" errorText={error} />
      ) : (
        <div>
          <ObjectiveTree collapse={isOpen} groupedList={filteredObjectives} />
        </div>
      )}
    </>
  );
}
