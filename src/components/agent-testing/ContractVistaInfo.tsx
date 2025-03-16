import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, BarChart2, FileText } from "lucide-react";

const ContractVistaInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">ContractVista</h2>
        <p className="text-gray-600">
          ContractVista is a powerful AI-driven system that analyzes legal
          contracts stored in a vector database (Qdrant) to identify
          similarities, differences, and potential conflicts. It makes legal
          document analysis faster, more accurate, and incredibly efficient.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Input:</strong> Provide a user query (e.g., "Find
              differences in warranty definitions") and connect the Qdrant
              vector database.
            </li>
            <li>
              <strong>Retrieve Contracts:</strong> The Data Retrieval Specialist
              searches the vector database for relevant contracts.
            </li>
            <li>
              <strong>Source Citing:</strong> The Source Citer Specialist
              identifies specific sections of interest.
            </li>
            <li>
              <strong>Conflict Analysis:</strong> The Conflicts of Interest
              Specialist checks for inconsistencies or potential conflicts.
            </li>
            <li>
              <strong>Generate Report:</strong> The Report Generation Specialist
              compiles findings into a markdown file (report.md).
            </li>
            <li>
              <strong>Review & Act:</strong> Use the insights to make informed
              decisions and improve contract quality.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Smart Retrieval:</h3>
            <p className="text-gray-600 pl-4">
              Finds relevant contracts quickly using advanced vector similarity
              search (powered by Qdrant).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Contract Classification:</h3>
            <p className="text-gray-600 pl-4">
              Automatically categorizes contracts into 22 types (e.g., License,
              Service, IP).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Semantic Chunking:</h3>
            <p className="text-gray-600 pl-4">
              Breaks down contracts into meaningful parts for better context
              preservation.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Source Citation:</h3>
            <p className="text-gray-600 pl-4">
              Provides precise references to sections, paragraphs, or clauses in
              contracts.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Conflict Analysis:</h3>
            <p className="text-gray-600 pl-4">
              Detects and highlights potential conflicts of interest within or
              across documents.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Comprehensive Reports:</h3>
            <p className="text-gray-600 pl-4">
              Generates markdown files with answers to user queries, detailed
              analysis, and cited sources.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-green-500" />
            Who Should Use This
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">ContractVista is ideal for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Legal Teams:</strong> Reviewing contracts efficiently and
              ensuring legal consistency.
            </li>
            <li>
              <strong>Businesses:</strong> Comparing vendor agreements,
              partnership contracts, and service agreements.
            </li>
            <li>
              <strong>Law Firms:</strong> Conducting large-scale document
              analysis with accuracy and traceability.
            </li>
            <li>
              <strong>Compliance Officers:</strong> Identifying potential legal
              conflicts in complex document sets.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          ContractVista combines the power of vector search technology (Qdrant)
          with specialized AI agents to deliver precise, relevant, and easily
          understandable results. By using semantic chunking and embedding-based
          search, it ensures high accuracy in analyzing complex documents.
        </p>
      </div>
    </div>
  );
};

export default ContractVistaInfo;
