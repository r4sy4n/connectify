const Loading = ({ center }) => {
  return  <div className={center ? 'loading-center' : ''}>
            <div className='loading'></div>
          </div>
};
export default Loading;
