import styles from "./StickersCountTable.module.css";

export default function StickersCountTable({ stickerCountByCode }) {
  return (
    <>
      <h2>Stickers count by code</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {stickerCountByCode.map(([code, count]) => (
            <tr key={code}>
              <td>{code}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
