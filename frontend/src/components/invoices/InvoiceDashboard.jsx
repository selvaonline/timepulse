// src/components/invoices/InvoiceDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InvoiceDashboard.css';

const InvoiceDashboard = () => {
  // Sample invoice data - in a real app, this would come from an API
  const [invoices, setInvoices] = useState([
    { 
      id: 1, 
      clientId: 1,
      clientName: "JPMC", 
      month: "July", 
      year: 2023,
      totalHours: 800, 
      amount: 80000, 
      status: "Sent" 
    },
    { 
      id: 2, 
      clientId: 2,
      clientName: "Accenture", 
      month: "July", 
      year: 2023,
      totalHours: 500, 
      amount: 50000, 
      status: "Draft" 
    },
    { 
      id: 3, 
      clientId: 3,
      clientName: "Virtusa", 
      month: "July", 
      year: 2023,
      totalHours: 300, 
      amount: 30000, 
      status: "Generated" 
    },
    { 
      id: 4, 
      clientId: 4,
      clientName: "Cognizant", 
      month: "June", 
      year: 2023,
      totalHours: 450, 
      amount: 45000, 
      status: "Paid" 
    },
    { 
      id: 5, 
      clientId: 5,
      clientName: "IBM", 
      month: "June", 
      year: 2023,
      totalHours: 900, 
      amount: 90000, 
      status: "Sent" 
    }
  ]);
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  
  // Generate invoice function
  const generateInvoice = (invoiceId) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: "Generated" } : invoice
    ));
    alert(`Invoice #${invoiceId} has been generated successfully!`);
  };
  
  // Send invoice function
  const sendInvoice = (invoiceId) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: "Sent" } : invoice
    ));
    alert(`Invoice #${invoiceId} has been sent to the client!`);
  };
  
  // Mark as paid function
  const markAsPaid = (invoiceId) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: "Paid" } : invoice
    ));
    alert(`Invoice #${invoiceId} has been marked as paid!`);
  };
  
  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    if (filterStatus !== 'all' && invoice.status.toLowerCase() !== filterStatus) {
      return false;
    }
    if (filterMonth !== 'all' && invoice.month.toLowerCase() !== filterMonth.toLowerCase()) {
      return false;
    }
    return true;
  });
  
  // Function to render status badge
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'Paid':
        return <span className="badge badge-dot badge-success">Paid</span>;
      case 'Sent':
        return <span className="badge badge-dot badge-info">Sent</span>;
      case 'Generated':
        return <span className="badge badge-dot badge-warning">Generated</span>;
      case 'Draft':
        return <span className="badge badge-dot badge-gray">Draft</span>;
      default:
        return <span className="badge badge-dot badge-secondary">{status}</span>;
    }
  };
  
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Invoice Dashboard</h3>
                  <div className="nk-block-des text-soft">
                    <p>Manage and generate client invoices based on approved timesheets.</p>
                  </div>
                </div>
                <div className="nk-block-head-content">
                  <div className="toggle-wrap nk-block-tools-toggle">
                    <button className="btn btn-primary">
                      <em className="icon ni ni-plus"></em>
                      <span>Create Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="nk-block">
              <div className="card card-bordered card-stretch">
                <div className="card-inner-group">
                  <div className="card-inner position-relative">
                    <div className="card-title-group">
                      <div className="card-title">
                        <h5 className="title">All Invoices</h5>
                      </div>
                      <div className="card-tools me-n1">
                        <ul className="btn-toolbar gx-1">
                          <li>
                            <div className="form-group">
                              <div className="form-control-wrap">
                                <select 
                                  className="form-select form-select-sm" 
                                  value={filterStatus}
                                  onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                  <option value="all">All Status</option>
                                  <option value="draft">Draft</option>
                                  <option value="generated">Generated</option>
                                  <option value="sent">Sent</option>
                                  <option value="paid">Paid</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <div className="form-control-wrap">
                                <select 
                                  className="form-select form-select-sm" 
                                  value={filterMonth}
                                  onChange={(e) => setFilterMonth(e.target.value)}
                                >
                                  <option value="all">All Months</option>
                                  <option value="july">July</option>
                                  <option value="june">June</option>
                                  <option value="may">May</option>
                                </select>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-inner p-0">
                    <div className="nk-tb-list nk-tb-ulist">
                      <div className="nk-tb-item nk-tb-head">
                        <div className="nk-tb-col"><span className="sub-text">Client Name</span></div>
                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Month</span></div>
                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Total Hours</span></div>
                        <div className="nk-tb-col"><span className="sub-text">Amount ($)</span></div>
                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></div>
                        <div className="nk-tb-col nk-tb-col-tools text-end">Actions</div>
                      </div>
                      
                      {filteredInvoices.map(invoice => (
                        <div key={invoice.id} className="nk-tb-item">
                          <div className="nk-tb-col">
                            <span className="tb-lead">{invoice.clientName}</span>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span>{invoice.month} {invoice.year}</span>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span>{invoice.totalHours}</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-amount">${invoice.amount.toLocaleString()}</span>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            {renderStatusBadge(invoice.status)}
                          </div>
                          <div className="nk-tb-col nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-1">
                              {invoice.status === 'Draft' && (
                                <li>
                                  <button 
                                    className="btn btn-trigger btn-icon" 
                                    onClick={() => generateInvoice(invoice.id)}
                                    title="Generate Invoice"
                                  >
                                    <em className="icon ni ni-file-text"></em>
                                  </button>
                                </li>
                              )}
                              
                              {invoice.status === 'Generated' && (
                                <li>
                                  <button 
                                    className="btn btn-trigger btn-icon" 
                                    onClick={() => sendInvoice(invoice.id)}
                                    title="Send Invoice"
                                  >
                                    <em className="icon ni ni-send"></em>
                                  </button>
                                </li>
                              )}
                              
                              {invoice.status === 'Sent' && (
                                <li>
                                  <button 
                                    className="btn btn-trigger btn-icon" 
                                    onClick={() => markAsPaid(invoice.id)}
                                    title="Mark as Paid"
                                  >
                                    <em className="icon ni ni-check-circle"></em>
                                  </button>
                                </li>
                              )}
                              
                              <li>
                                <Link 
                                  to={`/invoices/view/${invoice.id}`} 
                                  className="btn btn-trigger btn-icon"
                                  title="View Invoice"
                                >
                                  <em className="icon ni ni-eye"></em>
                                </Link>
                              </li>
                              
                              <li>
                                <Link 
                                  to={`/invoices/pdf/${invoice.id}`} 
                                  className="btn btn-trigger btn-icon"
                                  title="Download PDF"
                                >
                                  <em className="icon ni ni-download"></em>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                      
                      {filteredInvoices.length === 0 && (
                        <div className="nk-tb-item">
                          <div className="nk-tb-col" colSpan="6">
                            <div className="empty-state">
                              <p>No invoices found matching your filters.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="nk-block mt-5">
              <div className="row g-gs">
                <div className="col-md-6 col-lg-4">
                  <div className="card card-bordered">
                    <div className="card-inner">
                      <div className="card-title-group align-start mb-2">
                        <div className="card-title">
                          <h6 className="title">Total Invoiced</h6>
                        </div>
                      </div>
                      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
                        <div className="nk-sale-data">
                          <span className="amount">$295,000.00</span>
                          <span className="sub-title">This Month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card card-bordered">
                    <div className="card-inner">
                      <div className="card-title-group align-start mb-2">
                        <div className="card-title">
                          <h6 className="title">Payments Received</h6>
                        </div>
                      </div>
                      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
                        <div className="nk-sale-data">
                          <span className="amount">$135,000.00</span>
                          <span className="sub-title">This Month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-12 col-lg-4">
                  <div className="card card-bordered">
                    <div className="card-inner">
                      <div className="card-title-group align-start mb-2">
                        <div className="card-title">
                          <h6 className="title">Outstanding Amount</h6>
                        </div>
                      </div>
                      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
                        <div className="nk-sale-data">
                          <span className="amount">$160,000.00</span>
                          <span className="sub-title">Total</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDashboard;
