import { useState } from 'react';
import { useFormStore } from '@/store/formStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Code, FileJson } from 'lucide-react';

export function ExportPanel() {
  const { exportSchema, exportReactComponent } = useFormStore();
  const [exportType, setExportType] = useState<'schema' | 'component'>('schema');
  const [exportContent, setExportContent] = useState('');

  const handleExport = () => {
    if (exportType === 'schema') {
      const schema = exportSchema();
      setExportContent(JSON.stringify(schema, null, 2));
    } else {
      const component = exportReactComponent();
      setExportContent(component);
    }
  };

  const downloadFile = () => {
    const filename = exportType === 'schema' ? 'form-schema.json' : 'FormComponent.tsx';
    const blob = new Blob([exportContent], { 
      type: exportType === 'schema' ? 'application/json' : 'text/javascript' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-lg">Export Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button
            variant={exportType === 'schema' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setExportType('schema')}
            className="flex-1"
          >
            <FileJson className="w-4 h-4 mr-2" />
            JSON Schema
          </Button>
          <Button
            variant={exportType === 'component' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setExportType('component')}
            className="flex-1"
          >
            <Code className="w-4 h-4 mr-2" />
            React Component
          </Button>
        </div>

        <Button onClick={handleExport} className="w-full">
          Generate {exportType === 'schema' ? 'Schema' : 'Component'}
        </Button>

        {exportContent && (
          <>
            <Textarea
              value={exportContent}
              readOnly
              className="h-64 font-mono text-xs"
              placeholder="Export content will appear here..."
            />
            <Button onClick={downloadFile} className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download File
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}