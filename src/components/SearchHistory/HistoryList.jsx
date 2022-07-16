import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HistoryListItem from './HistoryListItem';

const HistoryList = () => {
  const histories = useSelector((state) => state.history.histories);

  const historyList = histories.map((history, index) => {
    return <HistoryListItem key={history.id} index={index} {...history} />;
  });

  const noHistoryRecord = (
    <div className="my-10 text-bold text-gray-500">No Record</div>
  );

  return (
    <Fragment>
      <h2 className="font-semibold text-left mt-4">Search History</h2>
      <hr />
      {!histories.length && noHistoryRecord}
      {historyList}
    </Fragment>
  );
};

export default HistoryList;
