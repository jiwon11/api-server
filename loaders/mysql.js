export default connection => {
  connection.sync({
    force: true
  });

  return connection;
};
