import React, { useState } from "react";
import { AlertCircle, Save, Send, X } from "lucide-react";

// Define the QuoteFormData type here directly
interface QuoteFormData {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    tax: number;
    total: number;
  }>;
  subtotal: number;
  totalTax: number;
  totalAmount: number;
  validityPeriod: number;
  notes: string;
  attachments: File[];
}

interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  tax: number;
}

interface QuotePreparationFormProps {
  orderId?: string;
  onSaveDraft?: (quoteData: QuoteFormData) => void;
  onSendQuote?: (quoteData: QuoteFormData) => void;
  onCancelQuote?: () => void;
}

const QuotePreparationForm: React.FC<QuotePreparationFormProps> = ({
  orderId = "ORD-001",
  onSaveDraft,
  onSendQuote,
  onCancelQuote,
}) => {
  const items: QuoteItem[] = [
    { id: "1", name: "Logo Design", quantity: 1, price: 750, tax: 0 },
    { id: "2", name: "Business Card Design", quantity: 1, price: 350, tax: 0 },
  ];

  const [validityPeriod, setValidityPeriod] = useState<number>(30);
  const [notes, setNotes] = useState<string>(
    "Price includes two rounds of revisions."
  );
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const calculateItemTotal = (item: QuoteItem) =>
    item.quantity * item.price + item.tax;

  const calculateSubtotal = () =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const calculateTotalTax = () =>
    items.reduce((sum, item) => sum + item.tax, 0);

  const calculateGrandTotal = () => calculateSubtotal() + calculateTotalTax();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    items.forEach((item, index) => {
      if (!item.name.trim())
        newErrors[`item-${index}-name`] = "Item name is required";
      if (item.quantity <= 0)
        newErrors[`item-${index}-quantity`] = "Quantity must be greater than 0";
      if (item.price < 0)
        newErrors[`item-${index}-price`] = "Price cannot be negative";
      if (item.tax < 0)
        newErrors[`item-${index}-tax`] = "Tax cannot be negative";
    });
    if (validityPeriod <= 0)
      newErrors["validityPeriod"] = "Validity period must be greater than 0";
    if (calculateGrandTotal() <= 0)
      newErrors["total"] = "Quote total must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getQuoteData = (): QuoteFormData => ({
    orderId,
    items: items.map((item) => ({
      ...item,
      total: calculateItemTotal(item),
    })),
    subtotal: calculateSubtotal(),
    totalTax: calculateTotalTax(),
    totalAmount: calculateGrandTotal(),
    validityPeriod,
    notes,
    attachments,
  });

  const handleSaveDraft = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const data = getQuoteData();
      onSaveDraft?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendQuote = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const data = getQuoteData();
      onSendQuote?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelQuote = () => {
    if (window.confirm("Cancel quote? Unsaved changes will be lost.")) {
      onCancelQuote?.();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const getErrorMessage = (field: string) => errors[field];

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Quote Preparation
          </h3>
          <p className="text-sm text-gray-500">
            Create a detailed quote for order {orderId}
          </p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
          Draft
        </span>
      </div>

      {/* Error Summary */}
      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Fix the following errors:
              </h3>
              <ul className="mt-2 text-sm text-red-700 list-disc pl-5 space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Validity Period */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Validity Period (days)
        </label>
        <input
          type="number"
          min={1}
          value={validityPeriod}
          onChange={(e) => setValidityPeriod(parseInt(e.target.value))}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
            getErrorMessage("validityPeriod")
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {getErrorMessage("validityPeriod") && (
          <p className="text-sm text-red-500 mt-1">
            {getErrorMessage("validityPeriod")}
          </p>
        )}
      </div>

      {/* Attachments */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Attachments
        </label>
        <input type="file" multiple onChange={handleFileUpload} />
        {attachments.length > 0 && (
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {attachments.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between">
          <button
            onClick={handleCancelQuote}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel Quote
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-gray-500 rounded-full" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Draft
            </button>
            <button
              onClick={handleSendQuote}
              disabled={isLoading || hasErrors}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePreparationForm;
