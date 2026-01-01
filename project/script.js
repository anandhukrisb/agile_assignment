// --- Mock Data ---
const courses = [
    {
        id: '1',
        title: 'Introduction to Web Development',
        category: 'Technology',
        duration: '8 weeks',
        difficulty: 'Beginner',
        description: 'Learn the fundamentals of HTML, CSS, and JavaScript',
        instructor: 'Dr. Sarah Chen',
        enrolled: true,
        progress: 65,
        modules: [
            { id: 'm1', title: 'HTML Basics', completed: true, duration: '2 hours' },
            { id: 'm2', title: 'CSS Fundamentals', completed: true, duration: '3 hours' },
            { id: 'm3', title: 'JavaScript Introduction', completed: false, duration: '4 hours' },
            { id: 'm4', title: 'Building Your First Website', completed: false, duration: '5 hours' },
        ]
    },
    {
        id: '2',
        title: 'Data Science Foundations',
        category: 'Data Science',
        duration: '12 weeks',
        difficulty: 'Intermediate',
        description: 'Master Python, statistics, and machine learning basics',
        instructor: 'Prof. Michael Roberts',
        enrolled: true,
        progress: 30,
        modules: [
            { id: 'm1', title: 'Python Programming', completed: true, duration: '6 hours' },
            { id: 'm2', title: 'Data Manipulation with Pandas', completed: false, duration: '5 hours' },
            { id: 'm3', title: 'Statistics for Data Science', completed: false, duration: '6 hours' },
            { id: 'm4', title: 'Introduction to Machine Learning', completed: false, duration: '8 hours' },
        ]
    },
    {
        id: '3',
        title: 'Digital Marketing Essentials',
        category: 'Marketing',
        duration: '6 weeks',
        difficulty: 'Beginner',
        description: 'Learn SEO, social media, and content marketing strategies',
        instructor: 'Maria Garcia',
        enrolled: false,
    },
    {
        id: '4',
        title: 'Advanced React Development',
        category: 'Technology',
        duration: '10 weeks',
        difficulty: 'Advanced',
        description: 'Deep dive into React, hooks, and state management',
        instructor: 'Alex Johnson',
        enrolled: false,
    },
    {
        id: '5',
        title: 'Business Communication Skills',
        category: 'Business',
        duration: '4 weeks',
        difficulty: 'Beginner',
        description: 'Master professional communication and presentation skills',
        instructor: 'Dr. Emily Williams',
        enrolled: false,
    },
    {
        id: '6',
        title: 'UI/UX Design Principles',
        category: 'Design',
        duration: '8 weeks',
        difficulty: 'Intermediate',
        description: 'Create user-centered designs with modern tools',
        instructor: 'David Kim',
        enrolled: false,
    },
];

const mentors = [
    {
        id: '1',
        name: 'Dr. Sarah Chen',
        expertise: ['Web Development', 'JavaScript', 'React'],
        availability: 'Weekdays 2-6 PM',
        rating: 4.9,
        bio: '10+ years of experience in full-stack development and teaching'
    },
    {
        id: '2',
        name: 'Prof. Michael Roberts',
        expertise: ['Data Science', 'Machine Learning', 'Python'],
        availability: 'Weekends 10 AM-4 PM',
        rating: 4.8,
        bio: 'PhD in Computer Science with focus on AI and data analytics'
    },
    {
        id: '3',
        name: 'Maria Garcia',
        expertise: ['Digital Marketing', 'SEO', 'Content Strategy'],
        availability: 'Flexible Hours',
        rating: 4.7,
        bio: 'Marketing consultant with 8 years of industry experience'
    },
    {
        id: '4',
        name: 'Alex Johnson',
        expertise: ['React', 'Frontend Architecture', 'TypeScript'],
        availability: 'Weekdays 9 AM-1 PM',
        rating: 4.9,
        bio: 'Senior software engineer at leading tech companies'
    },
    {
        id: '5',
        name: 'Dr. Emily Williams',
        expertise: ['Business Communication', 'Leadership', 'Career Development'],
        availability: 'Tuesdays & Thursdays',
        rating: 4.6,
        bio: 'Executive coach and communication expert'
    },
    {
        id: '6',
        name: 'David Kim',
        expertise: ['UI/UX Design', 'Figma', 'User Research'],
        availability: 'Weekdays 1-5 PM',
        rating: 4.8,
        bio: 'Product designer with focus on accessibility and usability'
    },
];

const studentData = {
    name: 'Alex Thompson',
    coursesEnrolled: 2,
    completionPercentage: 48,
    certificatesEarned: 3,
};

const certificates = [
    {
        id: '1',
        studentName: 'Alex Thompson',
        courseName: 'Introduction to Web Development',
        completionDate: 'December 15, 2024',
        certificateNumber: 'EDUBRIDGE-2024-001',
    },
    {
        id: '2',
        studentName: 'Alex Thompson',
        courseName: 'Python for Beginners',
        completionDate: 'November 20, 2024',
        certificateNumber: 'EDUBRIDGE-2024-002',
    },
];

// --- Router ---
const app = document.getElementById('app');

function navigate(path) {
    window.location.hash = path;
}

function router() {
    const hash = window.location.hash.slice(1) || '/';
    app.innerHTML = ''; // Clear previous content

    // Add Header (except for certificate preview?) - keeping it simple, header on all pages
    const header = renderHeader();
    app.insertAdjacentHTML('beforeend', header);

    const mainContainer = document.createElement('main');

    if (hash === '/') {
        mainContainer.innerHTML = renderLandingPage();
    } else if (hash === '/dashboard') {
        const studentDashboard = renderStudentDashboard();
        mainContainer.innerHTML = studentDashboard;
    } else if (hash === '/courses') {
        mainContainer.appendChild(renderCourseCatalog()); // Returns DOM element for event listeners
    } else if (hash.startsWith('/course/') && hash.endsWith('/progress')) {
        // Extract ID: /course/1/progress
        const id = hash.split('/')[2];
        mainContainer.innerHTML = renderCourseProgress(id);
    } else if (hash === '/mentors') {
        mainContainer.innerHTML = renderMentorDirectory();
    } else if (hash.startsWith('/certificate/')) {
        const id = hash.split('/')[2];
        mainContainer.innerHTML = renderCertificatePreview(id);
    } else {
        mainContainer.innerHTML = '<div class="container py-20 text-center"><h1>404 - Not Found</h1></div>';
    }

    app.appendChild(mainContainer);

    // Footer (except for certificate?)
    if (!hash.startsWith('/certificate/')) {
        app.insertAdjacentHTML('beforeend', renderFooter());
    }

    // Initialize Lucide icons
    lucide.createIcons();

    // Scroll to top
    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// --- Components ---

function renderHeader() {
    return `
    <header class="border-b bg-white sticky top-0" style="z-index: 50;">
        <div class="container py-4 flex items-center justify-between">
            <div class="flex items-center gap-2 cursor-pointer" onclick="navigate('/')">
                <i data-lucide="graduation-cap" class="h-8 w-8 text-primary"></i>
                <span class="text-xl font-semibold">EduBridge</span>
            </div>
            <nav class="hidden md:flex items-center gap-6">
                <a href="#/" class="nav-link">Home</a>
                <a href="#/courses" class="nav-link">Courses</a>
                <a href="#/mentors" class="nav-link">Mentors</a>
                <a href="#/dashboard" class="nav-link">Dashboard</a>
                <button class="btn btn-outline btn-sm">Login</button>
            </nav>
             <div class="md:hidden">
                <i data-lucide="menu" class="h-6 w-6"></i>
             </div>
        </div>
    </header>
    `;
}

function renderFooter() {
    return `
    <footer class="bg-gray-900 text-white py-12">
        <div class="container">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                     <div class="flex items-center gap-2 mb-4">
                        <i data-lucide="graduation-cap" class="h-6 w-6"></i>
                        <span class="font-semibold">EduBridge</span>
                    </div>
                    <p class="text-xs" style="color: #9ca3af;">Bridging the gap between education and opportunity worldwide.</p>
                </div>
                 <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="text-sm" style="color: #9ca3af; list-style: none;">
                        <li class="mb-2"><a href="#/courses" class="text-white">Courses</a></li>
                        <li class="mb-2"><a href="#/mentors" class="text-white">Mentors</a></li>
                        <li class="mb-2"><a href="#/dashboard" class="text-white">Dashboard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                     <ul class="text-sm" style="color: #9ca3af; list-style: none;">
                        <li class="mb-2">Help Center</li>
                        <li class="mb-2">Contact Us</li>
                    </ul>
                </div>
                 <div>
                    <h4 class="font-semibold mb-4">Connect</h4>
                    <div class="flex gap-4">
                        <span style="color: #9ca3af;">Social Icons Placeholder</span>
                    </div>
                </div>
            </div>
             <div class="border-t pt-8 text-center text-sm" style="color: #9ca3af;">
                <p>&copy; 2024 EduBridge. All rights reserved. Supporting SDG 4 - Quality Education for All.</p>
            </div>
        </div>
    </footer>
    `;
}

// --- Pages ---

function renderLandingPage() {
    return `
      <!-- Hero Section -->
      <section class="bg-gradient-hero py-20">
        <div class="container">
          <div class="text-center" style="max-width: 800px; margin: 0 auto;">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <i data-lucide="award" class="h-5 w-5 text-secondary"></i>
              <span class="text-sm">Aligned with SDG 4 – Quality Education</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
              Bridging Education to Opportunity
            </h1>
            <p class="text-xl text-muted-foreground mb-8">
              Empower your future with accessible, high-quality education designed for everyone, everywhere.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="navigate('/courses')" class="btn btn-primary btn-lg">Explore Courses</button>
                <button onclick="navigate('/dashboard')" class="btn btn-outline btn-lg" style="background:white">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-white">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Why Choose EduBridge?</h2>
            <p class="text-muted-foreground">
              We're committed to making quality education accessible and engaging for all learners
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="card hover:border-primary transition-all">
              <div class="card-content pt-6">
                <div class="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4" style="background: rgba(37,99,235,0.1)">
                  <i data-lucide="book-open" class="h-6 w-6 text-primary"></i>
                </div>
                <h3 class="font-semibold mb-2">Diverse Course Catalog</h3>
                <p class="text-muted-foreground">Access hundreds of courses across technology, business, design, and more</p>
              </div>
            </div>
            <div class="card hover:border-secondary transition-all">
              <div class="card-content pt-6">
                <div class="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4" style="background: rgba(16,185,129,0.1)">
                  <i data-lucide="users" class="h-6 w-6 text-secondary"></i>
                </div>
                <h3 class="font-semibold mb-2">Expert Mentorship</h3>
                <p class="text-muted-foreground">Connect with industry professionals for personalized guidance and support</p>
              </div>
            </div>
             <div class="card hover:border-accent transition-all">
              <div class="card-content pt-6">
                <div class="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4" style="background: rgba(245,158,11,0.1)">
                  <i data-lucide="award" class="h-6 w-6 text-amber-500"></i>
                </div>
                <h3 class="font-semibold mb-2">Recognized Certificates</h3>
                <p class="text-muted-foreground">Earn certificates to showcase your skills and advance your career</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Stats Section -->
       <section class="py-16 bg-muted">
        <div class="container">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div class="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-secondary mb-2">500+</div>
              <div class="text-muted-foreground">Expert Instructors</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-primary mb-2">300+</div>
              <div class="text-muted-foreground">Courses Available</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-secondary mb-2">95%</div>
              <div class="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    `;
}

function renderStudentDashboard() {
    const enrolledCourses = courses.filter(c => c.enrolled);

    return `
    <div class="bg-muted py-8" style="background-color: rgba(241,245,249,0.3)">
        <div class="container">
            <div class="mb-8">
              <h1 class="text-3xl font-bold mb-2">Welcome back, ${studentData.name}!</h1>
              <p class="text-muted-foreground">Continue your learning journey</p>
            </div>
            
            <!-- Stats -->
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div class="card bg-gradient-blue border-primary" style="border-width: 2px; border-color: rgba(37,99,235,0.2);">
                    <div class="card-content pt-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 rounded-lg flex items-center justify-center" style="background: rgba(37,99,235,0.1)">
                                <i data-lucide="book-open" class="h-6 w-6 text-primary"></i>
                            </div>
                             <span class="text-3xl font-bold text-primary">${studentData.coursesEnrolled}</span>
                        </div>
                         <h3 class="font-semibold mb-1">Courses Enrolled</h3>
                        <p class="text-sm text-muted-foreground">Active learning programs</p>
                    </div>
                </div>
                 <div class="card bg-gradient-green border-secondary" style="border-width: 2px; border-color: rgba(16,185,129,0.2);">
                    <div class="card-content pt-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 rounded-lg flex items-center justify-center" style="background: rgba(16,185,129,0.1)">
                                <i data-lucide="trending-up" class="h-6 w-6 text-secondary"></i>
                            </div>
                             <span class="text-3xl font-bold text-secondary">${studentData.completionPercentage}%</span>
                        </div>
                         <h3 class="font-semibold mb-1">Completion %</h3>
                        <p class="text-sm text-muted-foreground">Overall progress</p>
                    </div>
                </div>
                 <div class="card bg-gradient-amber border-accent" style="border-width: 2px; border-color: #fde68a;">
                    <div class="card-content pt-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 rounded-lg flex items-center justify-center" style="background: #fef3c7;">
                                <i data-lucide="award" class="h-6 w-6 text-amber-600"></i>
                            </div>
                             <span class="text-3xl font-bold text-amber-600">${studentData.certificatesEarned}</span>
                        </div>
                         <h3 class="font-semibold mb-1">Certificates Earned</h3>
                        <p class="text-sm text-muted-foreground">Completed programs</p>
                    </div>
                </div>
            </div>
            
            <!-- Quick Links -->
            <div class="grid md:grid-cols-3 gap-4 mb-8">
                 <button onclick="navigate('/courses')" class="btn btn-outline py-4" style="height: auto; justify-content: space-between;">
                    <div class="flex items-center gap-3">
                         <i data-lucide="book-open" class="h-5 w-5 text-primary"></i>
                         <span>My Courses</span>
                    </div>
                    <i data-lucide="chevron-right" class="h-5 w-5"></i>
                 </button>
                 <button onclick="navigate('/mentors')" class="btn btn-outline py-4" style="height: auto; justify-content: space-between;">
                    <div class="flex items-center gap-3">
                         <i data-lucide="users" class="h-5 w-5 text-secondary"></i>
                         <span>Find Mentors</span>
                    </div>
                     <i data-lucide="chevron-right" class="h-5 w-5"></i>
                 </button>
                 <button onclick="navigate('/certificate/1')" class="btn btn-outline py-4" style="height: auto; justify-content: space-between;">
                    <div class="flex items-center gap-3">
                         <i data-lucide="award" class="h-5 w-5 text-amber-600"></i>
                         <span>Certificates</span>
                    </div>
                    <i data-lucide="chevron-right" class="h-5 w-5"></i>
                 </button>
            </div>
            
            <!-- Active Courses -->
            <div class="mb-8">
                 <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold">Your Active Courses</h2>
                     <button onclick="navigate('/courses')" class="btn btn-ghost btn-sm">View All</button>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                    ${enrolledCourses.map(course => `
                        <div class="card hover:shadow-lg transition-all">
                            <div class="card-header">
                                <div class="flex items-start justify-between mb-2">
                                     <div class="h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-primary-light">
                                          <i data-lucide="book-open" class="h-6 w-6 text-primary"></i>
                                     </div>
                                      <span class="chip" style="background:var(--muted); font-weight:500; font-size:0.75rem;">${course.category}</span>
                                </div>
                                <h3 class="text-lg font-bold">${course.title}</h3>
                                <p class="text-sm text-muted-foreground">Instructor: ${course.instructor}</p>
                            </div>
                            <div class="card-content">
                                 <div class="flex items-center justify-between text-sm mb-2">
                                    <span class="text-muted-foreground">Progress</span>
                                    <span class="font-semibold">${course.progress}%</span>
                                </div>
                                <div style="width:100%; background:#e2e8f0; height:0.5rem; border-radius:999px; overflow:hidden; margin-bottom:1rem;">
                                    <div style="width:${course.progress}%; background:var(--primary); height:100%;"></div>
                                </div>
                                <div class="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                     <div class="flex items-center gap-1">
                                        <i data-lucide="clock" class="h-4 w-4"></i>
                                        <span>${course.duration}</span>
                                     </div>
                                      <div class="flex items-center gap-1">
                                         <span style="height:0.5rem; width:0.5rem; border-radius:999px; background-color:var(--secondary);"></span>
                                        <span>${course.difficulty}</span>
                                     </div>
                                </div>
                                <button onclick="navigate('/course/${course.id}/progress')" class="btn btn-primary w-full">Continue Learning</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderCourseCatalog() {
    // We need a container to hold the stateful filtering logic
    const container = document.createElement('div');
    container.className = "min-h-screen bg-muted py-8"
    container.style.backgroundColor = "rgba(241,245,249,0.3)";

    // Initial State
    let state = {
        category: 'all',
        difficulty: 'all'
    };

    // Helper to get unique categories
    const categories = ['All', ...new Set(courses.map(c => c.category))];
    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    function renderContent() {
        const filteredCourses = courses.filter(course => {
            const mCat = state.category === 'all' || course.category === state.category;
            const mDiff = state.difficulty === 'all' || course.difficulty === state.difficulty;
            return mCat && mDiff;
        });

        // Difficulty Color helper
        const getDiffColor = (d) => {
            if (d === 'Beginner') return 'background-color:#dcfce7; color:#15803d;'; // green
            if (d === 'Intermediate') return 'background-color:#dbeafe; color:#1d4ed8;'; // blue
            if (d === 'Advanced') return 'background-color:#f3e8ff; color:#7e22ce;'; // purple
            return 'background-color:#f3f4f6; color:#374151;';
        };

        const html = `
        <div class="container">
             <div class="mb-8">
                <h1 class="text-3xl font-bold mb-2">Course Catalog</h1>
                <p class="text-muted-foreground">Explore our diverse collection of courses</p>
            </div>
            
            <!-- Filters -->
            <div class="card mb-8">
                <div class="card-header">
                     <h3 class="font-bold flex items-center gap-2">
                        <i data-lucide="filter" class="h-5 w-5"></i> Filter Courses
                     </h3>
                </div>
                <div class="card-content">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium mb-2 block">Category</label>
                            <select id="cat-select" class="select">
                                ${categories.map(c => `<option value="${c}" ${state.category === c ? 'selected' : ''}>${c === 'All' ? 'All Categories' : c}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                             <label class="text-sm font-medium mb-2 block">Difficulty Level</label>
                            <select id="diff-select" class="select">
                                ${difficulties.map(d => `<option value="${d}" ${state.difficulty === d ? 'selected' : ''}>${d === 'All' ? 'All Levels' : d}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Results -->
            <div class="mb-4">
                <p class="text-sm text-muted-foreground">Showing ${filteredCourses.length} courses</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${filteredCourses.map(course => `
                     <div class="card hover:shadow-lg transition-all group cursor-pointer">
                        <div class="card-header">
                             <div class="h-16 w-16 bg-gradient-primary-light rounded-lg flex items-center justify-center mb-4">
                                <i data-lucide="book-open" class="h-8 w-8 text-primary"></i>
                             </div>
                             <div class="space-y-2">
                                <div class="flex items-center gap-2">
                                     <span class="chip" style="background:var(--muted);">${course.category}</span>
                                     <span class="chip" style="${getDiffColor(course.difficulty)}">${course.difficulty}</span>
                                </div>
                                <h3 class="text-lg font-bold">${course.title}</h3>
                             </div>
                        </div>
                        <div class="card-content">
                             <p class="text-sm text-muted-foreground mb-4" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${course.description}</p>
                             <div class="space-y-3">
                                 <div class="flex items-center justify-between text-sm text-muted-foreground">
                                    <div class="flex items-center gap-1">
                                        <i data-lucide="clock" class="h-4 w-4"></i> ${course.duration}
                                    </div>
                                    <div class="flex items-center gap-1">
                                         <i data-lucide="award" class="h-4 w-4"></i> Certificate
                                    </div>
                                 </div>
                                  <div class="text-sm text-muted-foreground">
                                    <span class="font-medium" style="color:var(--foreground)">Instructor:</span> ${course.instructor}
                                  </div>
                                  <button class="btn ${course.enrolled ? 'btn-outline' : 'btn-primary'} w-full" ${course.enrolled ? 'disabled' : ''}>
                                    ${course.enrolled ? 'Already Enrolled' : 'Enroll Now'}
                                  </button>
                             </div>
                        </div>
                     </div>
                `).join('')}
            </div>
             ${filteredCourses.length === 0 ? `
              <div class="card p-12 text-center">
                  <i data-lucide="book-open" class="h-12 w-12 text-muted-foreground mx-auto mb-4"></i>
                  <h3 class="text-lg font-semibold mb-2">No courses found</h3>
                   <button id="reset-filters" class="btn btn-outline">Reset Filters</button>
              </div>
             ` : ''}
        </div>
        `;

        container.innerHTML = html;

        // Add Event Listeners
        container.querySelector('#cat-select').addEventListener('change', (e) => {
            state.category = e.target.value;
            renderContent();
            lucide.createIcons();
        });
        container.querySelector('#diff-select').addEventListener('change', (e) => {
            state.difficulty = e.target.value;
            renderContent();
            lucide.createIcons();
        });
        const resetBtn = container.querySelector('#reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                state.category = 'all';
                state.difficulty = 'all';
                renderContent();
                lucide.createIcons();
            });
        }
    }

    renderContent();
    return container;
}

function renderCourseProgress(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return '<div class="container py-8">Course not found</div>';

    const completedCount = course.modules.filter(m => m.completed).length;
    const nextModule = course.modules.find(m => !m.completed);

    return `
    <div class="min-h-screen bg-muted py-8" style="background-color: rgba(241,245,249,0.3)">
        <div class="container">
             <button onclick="navigate('/dashboard')" class="btn btn-ghost mb-4 pl-0">
                <i data-lucide="arrow-left" class="h-4 w-4 mr-2"></i> Back to Dashboard
             </button>
             
             <!-- Header Card -->
             <div class="card mb-8 bg-gradient-hero">
                <div class="card-header">
                    <h1 class="text-2xl font-bold mb-2">${course.title}</h1>
                    <p class="text-muted-foreground mb-4">${course.description}</p>
                     <div class="flex items-center gap-4 text-sm">
                        <span class="flex items-center gap-1">
                             <i data-lucide="clock" class="h-4 w-4"></i> ${course.duration}
                        </span>
                        <span class="bg-white px-2 py-1 rounded shadow-sm">${course.difficulty}</span>
                     </div>
                </div>
                <div class="card-content">
                     <div class="flex items-center justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span class="font-semibold">${course.progress}% Complete</span>
                     </div>
                     <div style="width:100%; background:var(--border); height:0.75rem; border-radius:999px; overflow:hidden; margin-bottom:0.5rem;">
                        <div style="width:${course.progress}%; background:var(--primary); height:100%;"></div>
                     </div>
                     <p class="text-sm text-muted-foreground">${completedCount} of ${course.modules.length} modules completed</p>
                </div>
             </div>
             
             <div class="grid lg:grid-cols-3 gap-6">
                <!-- Modules -->
                <div class="lg:col-span-2">
                    <div class="card">
                        <div class="card-header"><h3 class="text-lg font-bold">Course Modules</h3></div>
                        <div class="card-content">
                             <div class="space-y-3">
                                ${course.modules.map((module, idx) => `
                                    <div class="p-4 border-2 rounded-lg flex items-start gap-4 ${module.completed ? 'bg-secondary/5 border-secondary/30' : 'border-border'}">
                                         <div class="mt-1">
                                            <i data-lucide="${module.completed ? 'check-circle-2' : 'circle'}" class="h-6 w-6 ${module.completed ? 'text-secondary' : 'text-muted-foreground'}"></i>
                                         </div>
                                         <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <span class="text-sm font-medium text-muted-foreground">Module ${idx + 1}</span>
                                                ${module.completed ? '<span class="chip chip-secondary text-xs">Completed</span>' : ''}
                                            </div>
                                            <h4 class="font-semibold mb-2">${module.title}</h4>
                                            <div class="flex items-center gap-1 text-sm text-muted-foreground">
                                                <i data-lucide="clock" class="h-4 w-4"></i> ${module.duration}
                                            </div>
                                         </div>
                                          ${!module.completed ? `
                                            <button class="btn btn-sm ${module === nextModule ? 'btn-primary' : 'btn-outline'}">
                                                ${module === nextModule ? 'Continue' : 'Start'}
                                            </button>
                                          ` : ''}
                                    </div>
                                `).join('')}
                             </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sidebar -->
                <div class="space-y-6">
                    ${nextModule ? `
                    <div class="card border-primary">
                        <div class="card-header"><h3 class="text-lg font-bold">Next Up</h3></div>
                        <div class="card-content">
                             <h4 class="font-semibold mb-2">${nextModule.title}</h4>
                             <p class="text-sm text-muted-foreground mb-4">Duration: ${nextModule.duration}</p>
                             <button class="btn btn-primary w-full">Continue Learning</button>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="card">
                         <div class="card-header"><h3 class="text-lg font-bold">Your Instructor</h3></div>
                         <div class="card-content">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                                    ${course.instructor.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h4 class="font-semibold">${course.instructor}</h4>
                                    <p class="text-sm text-muted-foreground">${course.category} Expert</p>
                                </div>
                            </div>
                            <button onclick="navigate('/mentors')" class="btn btn-outline w-full">View Profile</button>
                         </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
    `;
}

function renderMentorDirectory() {
    return `
    <div class="min-h-screen bg-muted py-8" style="background-color: rgba(241,245,249,0.3)">
        <div class="container">
             <div class="mb-8">
                <h1 class="text-3xl font-bold mb-2">Mentor Directory</h1>
                <p class="text-muted-foreground">Connect with experienced professionals</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${mentors.map(mentor => `
                    <div class="card hover:shadow-lg transition-all">
                        <div class="card-header">
                            <div class="flex items-start gap-4 mb-4">
                                <div class="h-16 w-16 bg-gradient-primary-light rounded-full flex items-center justify-center text-xl font-bold text-primary">
                                    ${mentor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold mb-1">${mentor.name}</h3>
                                    <div class="flex items-center gap-1 text-amber-500">
                                        <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                                        <span class="text-sm font-semibold">${mentor.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm text-muted-foreground">${mentor.bio}</p>
                        </div>
                        <div class="card-content">
                             <div class="mb-4">
                                <h4 class="text-sm font-semibold mb-2">Expertise</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${mentor.expertise.map(e => `<span class="chip bg-muted text-xs">${e}</span>`).join('')}
                                </div>
                             </div>
                             <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <i data-lucide="calendar" class="h-4 w-4"></i> Available: ${mentor.availability}
                             </div>
                             <div class="grid grid-cols-2 gap-2">
                                <button class="btn btn-outline btn-sm">Contact</button>
                                <button class="btn btn-primary btn-sm">Request Session</button>
                             </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    `;
}

function renderCertificatePreview(certId) {
    const cert = certificates.find(c => c.id === certId) || certificates[0];

    return `
     <div class="min-h-screen bg-muted py-8" style="background-color: rgba(241,245,249,0.3)">
        <div class="container">
             <button onclick="navigate('/dashboard')" class="btn btn-ghost mb-4 pl-0">
                <i data-lucide="arrow-left" class="h-4 w-4 mr-2"></i> Back to Dashboard
             </button>
             
             <div class="grid lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2">
                    <div class="card overflow-hidden">
                        <div class="bg-gradient-cert p-12 border-4 border-double border-primary/20 text-center">
                             <i data-lucide="award" class="h-12 w-12 text-primary mx-auto mb-4"></i>
                             <h1 class="text-4xl font-bold text-primary mb-2">EduBridge</h1>
                             <h2 class="text-2xl font-semibold mb-8">Certificate of Completion</h2>
                             
                             <p class="text-lg text-muted-foreground mb-4">This is to certify that</p>
                             <h3 class="text-3xl font-bold mb-4">${cert.studentName}</h3>
                             <p class="text-lg text-muted-foreground mb-4">has successfully completed the course</p>
                             <h4 class="text-2xl font-semibold text-primary mb-8">${cert.courseName}</h4>
                             <p class="text-muted-foreground mb-12">on ${cert.completionDate}</p>
                             
                             <div class="grid grid-cols-2 gap-8 text-center max-w-md mx-auto">
                                <div>
                                    <div class="h-px bg-gray-300 w-full mb-2"></div>
                                    <p class="text-sm font-medium">Authorized Signature</p>
                                </div>
                                <div>
                                    <div class="h-px bg-gray-300 w-full mb-2"></div>
                                    <p class="text-sm font-medium">Date of Issue</p>
                                </div>
                             </div>
                             <div class="mt-8 text-xs text-muted-foreground">Certificate No: ${cert.certificateNumber}</div>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-content space-y-3">
                            <button class="btn btn-primary w-full"><i data-lucide="download" class="h-4 w-4 mr-2"></i> Download PDF</button>
                            <button class="btn btn-outline w-full"><i data-lucide="share-2" class="h-4 w-4 mr-2"></i> Share Certificate</button>
                        </div>
                    </div>
                    
                    <div class="card">
                         <div class="card-content">
                            <h4 class="text-sm font-semibold mb-4">Certificate Details</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-muted-foreground">Issued To:</span>
                                    <span class="font-medium">${cert.studentName}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-muted-foreground">Course:</span>
                                    <span class="font-medium text-right">${cert.courseName}</span>
                                </div>
                                 <div class="flex justify-between">
                                    <span class="text-muted-foreground">Date:</span>
                                    <span class="font-medium">${cert.completionDate}</span>
                                </div>
                            </div>
                         </div>
                    </div>
                    
                    <!-- My Certificates Link list -->
                     <div class="card">
                        <div class="card-content">
                             <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold">My Certificates</h4>
                                <span class="text-sm text-primary font-medium">${studentData.certificatesEarned} Total</span>
                             </div>
                             <div class="space-y-2">
                                ${certificates.map(c => `
                                    <button onclick="navigate('/certificate/${c.id}')" class="w-full text-left p-2 rounded border ${c.id === certId ? 'bg-primary/5 border-primary' : 'hover:bg-muted'}">
                                        <div class="flex items-center gap-2">
                                            <i data-lucide="award" class="h-4 w-4 text-amber-500"></i>
                                            <div class="min-w-0">
                                                <p class="text-sm font-medium truncate">${c.courseName}</p>
                                                <p class="text-xs text-muted-foreground">${c.completionDate}</p>
                                            </div>
                                        </div>
                                    </button>
                                `).join('')}
                             </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
    `;
}
