const InfoCell = ({ blog }) => {
  return (
    <div className="d-flex align-items-center no_wrap">
      <div className="tbl_nm">
        <p> {blog.name}</p>
      </div>
    </div>
  );
};

export { InfoCell };
