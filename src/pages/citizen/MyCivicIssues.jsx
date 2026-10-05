import { useNavigate } from "react-router-dom";
import { getMyComplaints } from "@/services/complaintService";
import { getIssuesByComplaintIds } from "@/services/issueService";
import { citizenUser } from "@/data/mockUsers";
import IssueCard from "@/components/shared/IssueCard";
import EmptyState from "@/components/shared/EmptyState";

export default function MyCivicIssues() {
  const navigate = useNavigate();
  const myComplaints = getMyComplaints(citizenUser.email);
  const myIssues = getIssuesByComplaintIds(myComplaints.map((c) => c.id));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Civic Issues</h1>
      <p className="text-muted-foreground text-sm mb-2">Civic issues linked to your complaints.</p>

      {/* Concept explanation */}
      <div className="bg-card border border-border rounded-md p-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-center flex-shrink-0">
            <div className="text-2xl font-display font-bold text-muted-foreground">{myComplaints.length}</div>
            <div className="text-xs text-muted-foreground">Your Complaints</div>
          </div>
          <div className="flex items-center gap-2 self-center">
            <div className="flex-1 h-0.5 bg-border w-8" />
            <div className="text-xs font-mono-civic text-accent border border-accent/30 px-2 py-1 rounded">AI matched</div>
            <div className="flex-1 h-0.5 bg-border w-8" />
          </div>
          <div className="text-center flex-shrink-0">
            <div className="text-2xl font-display font-bold text-accent">{myIssues.length}</div>
            <div className="text-xs text-muted-foreground">Civic Issues</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">
          One civic issue can represent many individual complaints. Your complaints have been grouped with others reporting similar problems in the same area.
        </p>
      </div>

      {myIssues.length === 0 ?
      <EmptyState title="No civic issues linked yet" message="Your complaints will be linked to civic issues as they are analyzed." /> :

      <div className="flex flex-col gap-3">
          {myIssues.map((issue) =>
        <IssueCard
          key={issue.id}
          issue={issue}
          onClick={() => navigate(`/citizen/issues/${issue.id}`)} />

        )}
        </div>
      }
    </div>);

}