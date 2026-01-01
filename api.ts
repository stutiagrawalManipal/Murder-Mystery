
/**
 * VIRTUAL BACKEND SERVICE
 * Simulates a remote server for the Murder Mystery investigation.
 */

export interface TeamData {
  notes: string;
  verdict: any | null;
  startTime: number | null;
  verifiedEvidence: string[]; // Track verified codes
  lastSync: string;
}

export interface ApiLog {
  timestamp: string;
  method: 'GET' | 'POST' | 'DELETE';
  endpoint: string;
  status: number;
}

class VirtualBackend {
  private STORAGE_KEY = 'MYSTERY_MAINFRAME_DB';
  private LOG_KEY = 'MYSTERY_API_LOGS';

  private async delay(ms: number = 800) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private log(method: ApiLog['method'], endpoint: string, status: number = 200) {
    const logs = JSON.parse(localStorage.getItem(this.LOG_KEY) || '[]');
    const newLog: ApiLog = {
      timestamp: new Date().toISOString(),
      method,
      endpoint,
      status
    };
    logs.unshift(newLog);
    localStorage.setItem(this.LOG_KEY, JSON.stringify(logs.slice(0, 50)));
    window.dispatchEvent(new CustomEvent('api_log_updated'));
  }

  private getDB(): TeamData {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      return { 
        notes: '', 
        verdict: null, 
        startTime: null, 
        verifiedEvidence: [], 
        lastSync: new Date().toISOString() 
      };
    }
    return JSON.parse(raw);
  }

  private saveDB(data: TeamData) {
    data.lastSync = new Date().toISOString();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // API METHODS
  async getTeamData(): Promise<TeamData> {
    await this.delay(400);
    this.log('GET', '/v1/team-1/dossier');
    return this.getDB();
  }

  async updateNotes(notes: string): Promise<boolean> {
    await this.delay(600);
    const db = this.getDB();
    db.notes = notes;
    this.saveDB(db);
    this.log('POST', '/v1/team-1/notes');
    return true;
  }

  async verifyEvidence(code: string): Promise<boolean> {
    await this.delay(1200);
    const db = this.getDB();
    if (!db.verifiedEvidence.includes(code.toUpperCase())) {
      db.verifiedEvidence.push(code.toUpperCase());
      this.saveDB(db);
      this.log('POST', `/v1/team-1/evidence/${code}`);
    }
    return true;
  }

  async submitVerdict(verdict: any): Promise<boolean> {
    await this.delay(2000);
    const db = this.getDB();
    db.verdict = verdict;
    this.saveDB(db);
    this.log('POST', '/v1/team-1/verdict');
    return true;
  }

  async initializeTimer(startTime: number): Promise<boolean> {
    const db = this.getDB();
    if (!db.startTime) {
      db.startTime = startTime;
      this.saveDB(db);
      this.log('POST', '/v1/team-1/session/start');
    }
    return true;
  }

  async resetAll(): Promise<boolean> {
    await this.delay(1000);
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.LOG_KEY);
    this.log('DELETE', '/v1/team-1/reset');
    return true;
  }

  getLogs(): ApiLog[] {
    return JSON.parse(localStorage.getItem(this.LOG_KEY) || '[]');
  }
}

export const api = new VirtualBackend();
