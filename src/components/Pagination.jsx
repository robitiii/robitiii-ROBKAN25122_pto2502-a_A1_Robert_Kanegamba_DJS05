/**
 * Client-side pagination component with Previous/Next buttons and page numbers.
 * @param {Object} props
 * @param {number} props.currentPage - Current active page (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback when page changes (receives page number)
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buttonBase = {
    padding: "10px 16px",
    borderRadius: 8,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease",
    minWidth: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonDisabled = {
    ...buttonBase,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const buttonActive = {
    ...buttonBase,
    background: "#111",
    color: "#fff",
    borderColor: "#111",
  };

  const buttonHover = {
    ...buttonBase,
    background: "#f9fafb",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 32,
        marginBottom: 24,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={currentPage === 1 ? buttonDisabled : buttonBase}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            Object.assign(e.target.style, buttonHover);
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            Object.assign(e.target.style, buttonBase);
          }
        }}
      >
        Previous
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            style={buttonBase}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonBase)}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span style={{ padding: "0 4px", color: "#6b7280" }}>...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={page === currentPage ? buttonActive : buttonBase}
          onMouseEnter={(e) => {
            if (page !== currentPage) {
              Object.assign(e.target.style, buttonHover);
            }
          }}
          onMouseLeave={(e) => {
            if (page !== currentPage) {
              Object.assign(e.target.style, buttonBase);
            }
          }}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span style={{ padding: "0 4px", color: "#6b7280" }}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            style={buttonBase}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonBase)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? buttonDisabled : buttonBase}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            Object.assign(e.target.style, buttonHover);
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            Object.assign(e.target.style, buttonBase);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
