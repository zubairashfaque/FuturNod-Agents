import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AgentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const AgentCard = ({
  icon,
  title,
  description,
  tags,
  link,
}: AgentCardProps) => {
  return (
    <Card className="h-full bg-white hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500 mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            to={link}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Explore Agent
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
