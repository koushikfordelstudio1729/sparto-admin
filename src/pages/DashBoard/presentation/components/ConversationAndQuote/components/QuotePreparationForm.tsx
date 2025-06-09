import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle, Save, Send, XCircle } from "lucide-react";
import classNames from "classnames";
export interface QuoteFormPayload {
  requestId: string;
  items: QuoteItem[];
  validityPeriod: number;
  notes: string;
  media: File[];
  draft: boolean;
}

export interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

export interface QuotePreparationFormProps {
  requestId: string;
  onSaveDraft: (data: QuoteFormPayload) => void;
  onSendQuote: (data: QuoteFormPayload) => void;
  onCancelQuote: () => void;
  initialData?: Partial<QuoteFormPayload>;
  canEdit?: boolean;
}

const QuotePreparationForm: React.FC<QuotePreparationFormProps> = ({
  requestId,
  onSaveDraft,
  onSendQuote,
  onCancelQuote,
  initialData,
  canEdit = true,
}) => {
  const [items, setItems] = useState<QuoteItem[]>(initialData?.items || []);
  const [validityPeriod, setValidityPeriod] = useState<number>(
    initialData?.validityPeriod || 7
  );
  const [notes, setNotes] = useState<string>(initialData?.notes || "");
  const [mediaFiles, setMediaFiles] = useState<File[]>(
    initialData?.media || []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Total value
  const totalValue = items.reduce((sum, item) => sum + item.total, 0);

  // Recalculate per-item totals whenever qty/price/tax change
  useEffect(() => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        total: parseFloat(((item.price + item.tax) * item.quantity).toFixed(2)),
      }))
    );
     
  }, [
    ...items.map((i) => i.price),
    ...items.map((i) => i.tax),
    ...items.map((i) => i.quantity),
  ]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        quantity: 1,
        price: 0,
        tax: 0,
        total: 0,
      },
    ]);
  };

  const handleItemChange = (
    id: string,
    field: keyof Omit<QuoteItem, "id" | "total">,
    value: string
  ) => {
    const val = field === "name" ? value : Number(value) || 0;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const valid = files.every((f) => f.size < 10 * 1024 * 1024);
    if (!valid) {
      setErrors((prev) => ({
        ...prev,
        media: "File too large or unsupported format.",
      }));
      return;
    }
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    items.forEach((item, idx) => {
      if (!item.name) errs[`item_${idx}_name`] = "Name is required";
      if (item.quantity <= 0)
        errs[`item_${idx}_quantity`] = "Quantity must be positive";
      if (item.price <= 0) errs[`item_${idx}_price`] = "Price must be positive";
    });
    if (validityPeriod <= 0) errs.validity = "Validity period must be > 0";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (draft: boolean) => {
    if (!validate()) return;
    const payload: QuoteFormPayload = {
      requestId,
      items,
      validityPeriod,
      notes,
      media: mediaFiles,
      draft,
    };
    if (draft) onSaveDraft(payload);
    else onSendQuote(payload);
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Itemized Quote</h3>

        {/* Items List */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-6 gap-4 items-end">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
                className={classNames(
                  "col-span-2 p-2 border rounded",
                  errors[`item_${idx}_name`] && "border-red-500"
                )}
              />
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(item.id, "quantity", e.target.value)
                }
                className={classNames(
                  "p-2 border rounded",
                  errors[`item_${idx}_quantity`] && "border-red-500"
                )}
              />
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(item.id, "price", e.target.value)
                }
                className={classNames(
                  "p-2 border rounded",
                  errors[`item_${idx}_price`] && "border-red-500"
                )}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Tax"
                value={item.tax}
                onChange={(e) =>
                  handleItemChange(item.id, "tax", e.target.value)
                }
                className="p-2 border rounded"
              />
              <div className="p-2 bg-gray-100 rounded text-right">
                ${item.total.toFixed(2)}
              </div>
              {canEdit && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 p-2 hover:bg-red-50 rounded"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
          {canEdit && (
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center text-blue-600 hover:underline"
            >
              <PlusCircle className="mr-1" /> Add Item
            </button>
          )}
        </div>

        {/* Validity & Total */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Validity Period (days)
            </label>
            <input
              type="number"
              min="1"
              value={validityPeriod}
              onChange={(e) => setValidityPeriod(Number(e.target.value))}
              className={classNames(
                "p-2 border rounded w-32",
                errors.validity && "border-red-500"
              )}
            />
            {errors.validity && (
              <p className="text-red-500 text-xs">{errors.validity}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total</label>
            <div className="p-2 bg-gray-50 rounded font-semibold text-lg">
              ${totalValue.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Notes (optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Media Upload */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Media Upload</label>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf,video/*,audio/*"
            onChange={handleFileUpload}
            className="block"
          />
          {errors.media && (
            <p className="text-red-500 text-xs">{errors.media}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {mediaFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center bg-gray-100 px-2 py-1 rounded"
              >
                <span className="text-sm mr-2 truncate max-w-xs">
                  {file.name}
                </span>
                {canEdit && (
                  <button
                    type="button"
                    onClick={() =>
                      setMediaFiles((prev) => prev.filter((f) => f !== file))
                    }
                    className="text-red-500"
                  >
                    <XCircle />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4 justify-end">
          {canEdit && (
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="inline-flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Save className="mr-2" /> Save Draft
            </button>
          )}
          {canEdit && (
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Send className="mr-2" /> Send Quote
            </button>
          )}
          {!canEdit && (
            <button
              type="button"
              onClick={onCancelQuote}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <XCircle className="mr-2" /> Cancel Quote
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default QuotePreparationForm;
